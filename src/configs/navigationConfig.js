import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Clock size={20} />,
    navLink: "/"
  },

  // {
  //   type: "groupHeader",
  //   groupTitle: "Example"
  // },

  {
   id: "formLayouts",
   title: "Form Layouts",
   type: "item",
   icon: <Icon.Box size={20} />,
   permissions: ["admin", "editor"],
   navLink: "/forms/layout/form-layout"
  },

  {
    id:"test",
    title:"Staff",
    type:"item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/test"
  },
   {
     id: "AdmissionManager",
     title: "Admission Manager",
    type: "item",
     icon: <Icon.List size={20} />,
    permissions: ["admin", "editor"],
     navLink: "/AdmissionManager"
  },
  {
    id: "Consultants",
    title: "Consultants",
    type: "item",
    icon: <i className="far fa-handshake" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Consultants"
  },
  {
    id: "Student",
    title: "Student",
    type: "item",
    icon: <i className="fas fa-graduation-cap" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Student"
  },
  {
    id: "University",
    title: "University",
    type: "item",
    icon: <i className="fas fa-university" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/University"
  },

  {
    id: "Search&Apply",
    title: "Search & Apply",
    type: "item",
    icon: <i className="fas fa-search" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Search&Apply"
  },

  {
    id: "Applications",
    title: "Applications",
    type: "item",
    icon: <i className="fas fa-file" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Applications"
  },

  {
    id: "Commission",
    title: "Commission",
    type: "item",
    icon: <i className="fas fa-money-check" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Commission"
  },

  {
    id: "AppsTransaction",
    title: "Apps Transaction",
    type: "item",
    icon: <i className="fas fa-money-check" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Apps Transaction"
  },

  {
    id: "Notice",
    title: "Notice",
    type: "item",
    icon:<i className="far fa-bell" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Commission"
  },

  {
    id: "Report",
    title: "Report",
    type: "item",
    icon: <i className="far fa-newspaper" size={20}></i>,
    permissions: ["admin", "editor"],
    navLink: "/Commission"
  },

  {
    id: "Demo",
    title: "Demo",
    type: "collapse",
    icon: <i className="far fa-newspaper" size={20}></i>,
    permissions: ["admin", "editor"],
    children: [
      {
      id: "Demo2",
      title: "Demo2",
      type: "item",
      icon: <i className="far fa-newspaper" size={20}></i>,
      permissions: ["admin", "editor"],
      navLink: "/demo"
     },

    ]
  },


]

export default navigationConfig
