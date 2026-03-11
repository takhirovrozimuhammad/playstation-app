import { useState } from "react";
import { clients as initialClients } from "../data/mockData";
import { Button } from "../components/ui/button";
import { Plus, Search, Mail, Phone, UserPlus } from "lucide-react";
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
import { format } from "date-fns";
import { toast } from "sonner";

export function ClientsPage() {
  const [clients] = useState(initialClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.email.toLowerCase().includes(searchLower) ||
      client.phone.toLowerCase().includes(searchLower)
    );
  });

  const handleAddClient = () => {
    toast.success("Client added successfully");
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-slate-400">Manage client information and history</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg shadow-purple-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/20 text-slate-100 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Client</DialogTitle>
              <DialogDescription className="text-slate-400">
                Register a new client in the system
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="client-name" className="text-slate-300">
                  Full Name
                </Label>
                <Input
                  id="client-name"
                  placeholder="Enter full name"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="email@example.com"
                  className="bg-slate-800/50 border-slate-700 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-phone" className="text-slate-300">
                  Phone
                </Label>
                <Input
                  id="client-phone"
                  placeholder="+966 50 123 4567"
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
                onClick={handleAddClient}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
              >
                Add Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Clients table */}
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800/50 hover:bg-slate-800/30">
                <TableHead className="text-slate-400">Client</TableHead>
                <TableHead className="text-slate-400">Contact</TableHead>
                <TableHead className="text-slate-400">Member Since</TableHead>
                <TableHead className="text-slate-400">Last Visit</TableHead>
                <TableHead className="text-slate-400">Total Visits</TableHead>
                <TableHead className="text-slate-400">Total Spent</TableHead>
                <TableHead className="text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="border-slate-800/50 hover:bg-slate-800/30"
                >
                  <TableCell className="text-slate-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-slate-500">ID: {client.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-slate-500" />
                        <span>{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>{client.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {format(client.memberSince, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {client.lastVisit
                      ? format(client.lastVisit, "MMM dd, yyyy")
                      : "Never"}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    <span className="font-semibold text-cyan-400">
                      {client.totalVisits}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    <span className="font-semibold text-green-400">
                      SAR {client.totalSpent.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-700 text-slate-300 hover:bg-slate-800"
                        onClick={() => toast.info("View client details")}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                        onClick={() => toast.success("Quick booking started")}
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-purple-500/20 p-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-sm text-slate-400">Total Clients</p>
              <p className="text-2xl font-bold text-white">{clients.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-cyan-400" />
            <div>
              <p className="text-sm text-slate-400">Total Visits</p>
              <p className="text-2xl font-bold text-white">
                {clients.reduce((sum, c) => sum + c.totalVisits, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-green-500/20 p-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-white">
                SAR{" "}
                {clients.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl border border-blue-500/20 p-4">
          <div className="flex items-center gap-3">
            <UserPlus className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-slate-400">Avg. Spent</p>
              <p className="text-2xl font-bold text-white">
                SAR{" "}
                {(
                  clients.reduce((sum, c) => sum + c.totalSpent, 0) /
                  clients.length
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
