import React from 'react';
import {
CDBSidebar,
CDBSidebarContent,
CDBSidebarFooter,
CDBSidebarHeader,
CDBSidebarMenu,
CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';


 const Sidebar = () => {
    return (
    <div style={{ display: 'flex', height: 'auto', overflow: 'scroll initial'}}>
    <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-xlarge"></i>}>
            <a href="#" className="text-decoration-none" style={{ color: 'inherit' }}>
                DASHBOARD
            </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
                
                <NavLink  to="/mypets" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="table">My Pets</CDBSidebarMenuItem>
                </NavLink>
                <NavLink to="/newpet" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="columns">Add Pets</CDBSidebarMenuItem>
                </NavLink>
                <NavLink  to="/calendar" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="chart-line">Pet Calendar</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/edit-profile" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user">My Profile</CDBSidebarMenuItem>
                </NavLink>
                <NavLink  to="/contact" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="chart-line">Contact Us</CDBSidebarMenuItem>
                </NavLink>
                <NavLink
                exact 
                to="/hero404"
                target="_blank"
                activeClassName="activeClicked"
                >
                    <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                </NavLink>
            </CDBSidebarMenu>
        </CDBSidebarContent>


        

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
            
        <div style={{padding: '20px 5px'}}>
        Copyright © PETAPP
        </div>
        </CDBSidebarFooter>
        </CDBSidebar>
    </div>
    );
};
export default Sidebar;