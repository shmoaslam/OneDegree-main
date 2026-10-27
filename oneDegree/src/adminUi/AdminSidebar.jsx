import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Table, Table2 } from "lucide-react";
import { IoMdColorFill } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import AddStore from "./add store table/AddStoreTable";
import AddProductsTable from "@/adminUi/add products/AddProductsTable";
import AddCategory from "./AddCategory";
import { RiAddCircleLine } from "react-icons/ri";
import AddMaterial from "./AddMaterial";
import AddColor from "./AddColor";
import AddCollection from "./AddCollection";
import { HiOutlineCollection } from "react-icons/hi";
import AddFinishing from "./AddFinishing";
import AddFrameType from "./AddFrameType";
import AddShape from "./AddShape";
import { GrAdd } from "react-icons/gr";

const AdminSidebar = () => {
  const [activeComponent, setActiveComponent] = useState("table");

  const componentsMap = {
    table: <AddProductsTable />,
    store: <AddStore />,
    addcategory: <AddCategory />,
    addmaterial: <AddMaterial />,
    addcolor: <AddColor />,
    addcollection: <AddCollection />,
    addfinishing: <AddFinishing />,
    addtypeframe: <AddFrameType />,
    addshape: <AddShape />,
  };

  return (
    <div>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveComponent("table")}>
                  <Table className="font-lg" />
                  <span className="font-semibold "> Products Table</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setActiveComponent("store")}>
                  <Table2 />
                  <span className="font-semibold">Store Table</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addcategory")}
                >
                  <TbCategoryPlus />
                  <span className="font-semibold">Add Category</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addmaterial")}
                >
                  <RiAddCircleLine />
                  <span className="font-semibold">Add Material</span>
                </SidebarMenuButton>
              </SidebarMenuItem>


              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addfinishing")}
                >
                  <GrAdd />
                  <span className="font-semibold">Add Finishing</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addcolor")}
                >
                  <IoMdColorFill />
                  <span className="font-semibold">Add Colors</span>
                </SidebarMenuButton>
              </SidebarMenuItem>


              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addcollection")}
                >
                  <HiOutlineCollection />
                  <span className="font-semibold">Add Collection</span>
                </SidebarMenuButton>
              </SidebarMenuItem>


              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addtypeframe")}
                >
                  <HiOutlineCollection />
                  <span className="font-semibold">Add Type Frame</span>
                </SidebarMenuButton>
              </SidebarMenuItem>


              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveComponent("addshape")}
                >
                  <HiOutlineCollection />
                  <span className="font-semibold">Add Shape</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
            <SidebarGroup />
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        {/* Render the active component */}
        <div>{componentsMap[activeComponent]}</div>
      </SidebarProvider>
    </div>
  );
};

export default AdminSidebar;
