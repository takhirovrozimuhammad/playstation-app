import { useState } from "react";
import { payments as initialPayments, clients, bookings } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Plus, Search, DollarSign, CreditCard, Banknote, Smartphone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { format } from "date-fns";
import { toast } from "sonner";
import { StatusBadge } from "../components/StatusBadge";

export function PaymentsPage() {
  const [payments] = useState(initialPayments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState<string>("all");

  const filteredPayments = payments.filter((payment) => {
    const client = clients.find((c) => c.id === payment.clientId);
    const matchesSearch =
      client?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMethod =
      filterMethod === "all" || payment.method === filterMethod;
    return matchesSearch && matchesMethod;
  });

  const handleRecordPayment = () => {
    toast.success("Payment recorded successfully");
    setIsDialogOpen(false);
  };

  const todayPayments = payments.filter(
    (p) => p.timestamp.toDateString() === new Date().toDateString()
  );
  const todayRevenue = todayPayments.reduce((sum, p) => sum + p.amount, 0);
  const cashPayments = payments.filter((p) => p.method === "cash");
  const cardPayments = payments.filter((p) => p.method === "card");
  const onlinePayments = payments.filter((p) => p.method === "online");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Payments</h1>
          <p className="text-slate-400">Track payments and manage cashier operations</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/20 text-slate-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Record Payment</DialogTitle>
              <DialogDescription className="text-slate-400">
                Record a new payment transaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment-booking" className="text-slate-300">
                  Booking
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select booking" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    {bookings
                      .filter((b) => !b.paid)
                      .map((booking) => {
                        const client = clients.find(
                          (c) => c.id === booking.clientId
                        );
                        return (
                          <SelectItem key={booking.id} value={booking.id}>
                            {client?.name} - SAR {booking.totalAmount}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method" className="text-slate-300">
                  Payment Method
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800">
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="online">Online Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-amount" className="text-slate-300">
                  Amount (SAR)
                </Label>
                <Input
                  id="payment-amount"
                  type="number"
                  placeholder="100.00"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRecordPayment}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Record Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Revenue stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-green-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/20">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-green-400">
                SAR {todayRevenue.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">{todayPayments.length} transactions</p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-yellow-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Banknote className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Cash</p>
              <p className="text-2xl font-bold text-yellow-400">
                SAR {cashPayments.reduce((s, p) => s + p.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">{cashPayments.length} transactions</p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-blue-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Card</p>
              <p className="text-2xl font-bold text-blue-400">
                SAR {cardPayments.reduce((s, p) => s + p.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">{cardPayments.length} transactions</p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Smartphone className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Online</p>
              <p className="text-2xl font-bold text-purple-400">
                SAR {onlinePayments.reduce((s, p) => s + p.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">{onlinePayments.length} transactions</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search by client or payment ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "cash", "card", "online"] as const).map((method) => (
              <Button
                key={method}
                variant={filterMethod === method ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterMethod(method)}
                className={
                  filterMethod === method
                    ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                {method === "all" ? "All" : method}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Payments table */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-400">Payment ID</TableHead>
                <TableHead className="text-slate-400">Client</TableHead>
                <TableHead className="text-slate-400">Booking</TableHead>
                <TableHead className="text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-400">Method</TableHead>
                <TableHead className="text-slate-400">Date & Time</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const client = clients.find((c) => c.id === payment.clientId);
                return (
                  <TableRow
                    key={payment.id}
                    className="border-slate-800/50 hover:bg-slate-800/30"
                  >
                    <TableCell className="font-mono text-slate-300">
                      #{payment.id.slice(-8)}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {client?.name}
                    </TableCell>
                    <TableCell className="font-mono text-slate-400 text-sm">
                      #{payment.bookingId.slice(-8)}
                    </TableCell>
                    <TableCell className="text-green-400 font-bold">
                      SAR {payment.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {payment.method === "cash" && (
                          <Banknote className="w-4 h-4 text-yellow-400" />
                        )}
                        {payment.method === "card" && (
                          <CreditCard className="w-4 h-4 text-blue-400" />
                        )}
                        {payment.method === "online" && (
                          <Smartphone className="w-4 h-4 text-purple-400" />
                        )}
                        <span className="text-slate-300 capitalize">
                          {payment.method}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div>
                        <p>{format(payment.timestamp, "MMM dd, yyyy")}</p>
                        <p className="text-xs text-slate-500">
                          {format(payment.timestamp, "HH:mm:ss")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={payment.status} className="text-xs" />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => toast.info("View receipt")}
                      >
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
