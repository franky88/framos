import HeaderBreadcrumb from "@/components/HeaderBreadcrumb";
import SkillList from "@/components/skill/SkillList";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default async function Page() {
  return (
    <>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <HeaderBreadcrumb activeTitle="Skills" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SkillList />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </>
  );
}
