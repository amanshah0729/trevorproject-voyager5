import React from 'react';
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

interface Mail {
  phoneNumber: string;
  name: string;
  urgency: number;
  lastCall: string;
}

const navMain = [
  { title: 'Patient List' }
];

const initialMails: Mail[] = [
  {
    phoneNumber: '1',
    name: 'John Doe',
    urgency: 7,
    lastCall: '2024-03-20'
  },
  {
    phoneNumber: '2',
    name: 'Jane Smith',
    urgency: 4,
    lastCall: '2024-03-19'
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem] = React.useState(navMain[0]);
  const [mails, setMails] = React.useState<Mail[]>(initialMails);

  const getUrgencyColor = (score: number) => {
    if (score >= 8) return 'bg-red-500';
    if (score >= 5) return 'bg-orange-500';
    if (score >= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const sortByUrgency = () => {
    setMails([...mails].sort((a, b) => b.urgency - a.urgency));
  };

  const sortByLastCall = () => {
    setMails([...mails].sort((a, b) => new Date(b.lastCall).getTime() - new Date(a.lastCall).getTime()));
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <div className="hidden flex-1 md:flex flex-col">
        <SidebarHeader className="gap-3.5 border-b bg-orange-200 p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  Filter By <ChevronDown className="w-4 h-4 relative top-0.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={sortByUrgency}>Urgency</DropdownMenuItem>
                  <DropdownMenuItem onClick={sortByLastCall}>Last Call</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Label>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {mails.map((mail) => (
                <a
                  href="#"
                  key={mail.phoneNumber}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{mail.name}</span>
                    <div className={`ml-auto flex items-center gap-2 rounded-full px-2 py-1 text-white ${getUrgencyColor(mail.urgency)}`}>
                      <span className="text-xs font-medium">Urgency: {mail.urgency}</span>
                    </div>
                  </div>
                  <span className="font-medium">Last Call: {mail.lastCall}</span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
} 