import EmptyState from '@/components/empty-state/EmptyState';
import Navbar from '@/components/navbar/Navbar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Title from '@/components/ui/title';
import { formatUSDateTimeShort } from '@/lib/format/time';
import { useGetMyBorrowBookQuery } from '@/store/service/users';
import { FolderX, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import React, { useState, useEffect } from 'react';
import { useReturnBorrowBookMutation } from '@/store/service/borrowing';
import { getErrorObject } from '@/lib/helpers/error-message';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useLocation, useNavigate } from 'react-router';
import capitalizeFirstLetter from '@/lib/format/text/Capitalize';


interface MyBorrowProps { }

const MyBorrow: React.FC<MyBorrowProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get status from URL, default to 'borrowed'
    const getStatusFromURL = () => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('status') || 'borrowed';
    };

    const [statusFilter, setStatusFilter] = useState<string>(getStatusFromURL());
    const { data, isLoading } = useGetMyBorrowBookQuery({ status: statusFilter });
    const [handleReturnBook] = useReturnBorrowBookMutation()

    // Update URL when status changes
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('status', statusFilter);
        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }, [statusFilter, location.pathname, navigate]);

    async function handleReturn(id: string) {
        try {
            const response = await handleReturnBook({ borrowId: id });

            const error = getErrorObject(response.error);
            if (error) {
                toast({
                    variant: "destructive",
                    title: error.messages,
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
                return;
            }

            toast({
                variant: "default",
                title: "Book Returned Successfully",
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Update status filter when changing tabs
    const handleTabChange = (value: string) => {
        setStatusFilter(value);
    };

    return (
        <>
            <Navbar />
            <div className="p-8">
                <Title title="Borrowing" description="List all my borrowed books" />

                <div className="mt-6">
                    <Tabs
                        defaultValue={statusFilter}
                        value={statusFilter}
                        onValueChange={handleTabChange}
                    >
                        <TabsList>
                            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
                            <TabsTrigger value="returned">Returned</TabsTrigger>
                        </TabsList>
                        <TabsContent value="borrowed"></TabsContent>
                        <TabsContent value="returned"></TabsContent>
                    </Tabs>
                </div>

                {/* Rest of the component remains the same */}
                <div className="mt-8">
                    <ScrollArea className="mt-6 border rounded-md h-[58%]">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 text-center">#</TableHead>
                                    <TableHead className="w-32">Cover</TableHead>
                                    <TableHead className="w-64">Title</TableHead>
                                    <TableHead className="w-60">Status</TableHead>
                                    <TableHead className="w-60">Borrowed Date</TableHead>
                                    <TableHead className="w-60">Returned Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!isLoading && data?.data.Borrowing && data.data.Borrowing.length > 0 ? (
                                    data.data.Borrowing.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-center font-medium">{index + 1}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={`http://localhost:5000/public/${item?.book?.coverImage}`}
                                                    alt={item.book?.title || "No Title"}
                                                    className="w-11 h-11 rounded-md object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{item.book?.title}</TableCell>
                                            <TableCell>
                                                <Badge variant={item.status === "borrowed" ? "destructive" : "success"}>{capitalizeFirstLetter(item.status)}</Badge>
                                            </TableCell>
                                            <TableCell>{formatUSDateTimeShort(item.borrowDate)}</TableCell>
                                            <TableCell>{item.returnDate ? formatUSDateTimeShort(item.returnDate) : "Not Returned"}</TableCell>
                                            {statusFilter === "borrowed" && (
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem
                                                                className="cursor-pointer"
                                                                onClick={() => {
                                                                    handleReturn(item.id)
                                                                }}
                                                            >
                                                                Return Book
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8}>
                                            <EmptyState
                                                icon={FolderX}
                                                title={statusFilter === "borrowed" ? "No Borrowing Records" : "No Return Records"}
                                                description={statusFilter === "borrowed" ? "No books have been borrowed yet." : "No books have been returned yet."}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </div>
        </>
    );
};

export default MyBorrow;