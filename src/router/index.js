import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
// import UserLogin from '@/components/UserLogin'

// Import Department Components
import Department from '@/components/department/department'
import DepartmentPortal from '@/components/department/departmentPortal'
import DepartmentDisplay from '@/components/department/showDepartment'
import EditDepartment from '@/components/department/editDepartment'

// Import Staff Components
import Staff from '@/components/staff/staff'
import StaffPortal from '@/components/staff/staffPortal'
import StaffDisplay from '@/components/staff/showStaff'
import EditStaff from '@/components/staff/editStaff'

// Authentication Components
import Login from '@/components/authentication/login.vue'

// 404 Error
import Error404 from '@/components/errorPage/404.vue'

// Import Customer Components
import Customer from '@/components/customer/customer'
import customerPortal from '@/components/customer/customerPortal'
import CustomerDisplay from '@/components/customer/showCustomer'
import EditCustomer from '@/components/customer/editCustomer'
import CustomerQuesAns from '@/components/customer/showQuesAnsCustomer'

// Customer Questionnaire
import Questions from '@/components/questionnaire/questions.vue'
import addQuestions from '@/components/questionnaire/newQuestions.vue'
import questionnairePortal from '@/components/questionnaire/questionPortal.vue'

// Import vendor Components
import vendor from '@/components/vendor/vendor'
import vendorPortal from '@/components/vendor/vendorPortal'
import VendorDisplay from '@/components/vendor/showVendor'
import EditVendor from '@/components/vendor/editVendor'

// Import Fabric Components
import Fabric from '@/components/fabric/fabric'
import FabricPortal from '@/components/fabric/fabricPortal'
import FabricDisplay from '@/components/fabric/showFabric'
import EditFabric from '@/components/fabric/editFabric'


// Import FPO Components
import FPO from '@/components/fpo/createfpo'
import FPOPortal from '@/components/fpo/fpoPortal'
import FPODisplay from '@/components/fpo/showFPO'
import EditFPO from '@/components/fpo/editFPO'

// Import LPO Components
import LPO from '@/components/lpo/createlpo'
import LPOPortal from '@/components/lpo/lpoPortal'
import LPODisplay from '@/components/lpo/showLPO'
import EditLPO from '@/components/lpo/editLPO'

// Import APO Components
import APO from '@/components/apo/createapo'
import APOPortal from '@/components/apo/apoPortal'
import APODisplay from '@/components/apo/showAPO'
import EditAPO from '@/components/apo/editAPO'

// Import Sales Components
import Sales from '@/components/salesOrder/sales'
import SalesOrderDisplay from '@/components/salesOrder/showSales'
import SalesPortal from '@/components/salesOrder/salesPortal'
import EditSales from '@/components/salesOrder/editSales'

// Import PO Dashboard Component
import PoDashBoard from '@/components/poDashboardv2/poDash'
import PoDashBoardv2 from '@/components/poDashboard/poDash'


// Import Fabric Images Component
import FabricImages from '@/components/fabricImages/imagesPortal'
import AddFabricImages from '@/components/fabricImages/addfabricimage'


Vue.use(Router)

import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM-DD-YYYY')
  }
})

Vue.filter('formatDate2', function(value) {
  if (value) {
    return moment(String(value)).format('YYYYMMDD')
  }
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: (to, from, next) => {
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        var userData = JSON.parse(getCookie('userData'));
        if (userData) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: Questions
    },
    {
      path: '/addquestionnaire',
      name: 'addQuestionnaire',
      component: addQuestions
    },
    {
      path: '/questionnairePortal',
      name: 'questionnairePortal',
      component: questionnairePortal
    },
    {
      path: '/department',
      name: 'department',
      component: Department
    },
    {
      path: '/department-portal',
      name: 'department-portal',
      component: DepartmentPortal
    },
    {
      path: '/department/:deptID',
      name: 'department-display',
      component: DepartmentDisplay
    },
    {
      path: '/department/edit/:deptID',
      name: 'department-edit',
      component: EditDepartment
    },
    {
      path: '/staff/',
      name: 'staff',
      component: Staff
    },
    {
      path: '/staff-portal',
      name: 'staff-portal',
      component: StaffPortal
    },
    {
      path: '/staff/:staffID',
      name: 'staff-display',
      component: StaffDisplay
    },
    {
      path: '/staff/edit/:staffID',
      name: 'staff-edit',
      component: EditStaff
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/error-404',
      name: 'error',
      component: Error404
    },
    {
      path: '/customer',
      name: 'customer',
      component: Customer
    },
    {
      path: '/customer/:custID/',
      name: 'customer-display',
      component: CustomerDisplay
    },
    {
      path: '/customer/edit/:custID',
      name: 'customer-edit',
      component: EditCustomer
    },
    {
      path: '/customer/question-answers/:custID',
      name: 'customer-quesAns',
      component: CustomerQuesAns
    },
    {
      path: '/customer-portal',
      name: 'customer-portal',
      component: customerPortal
    },
    {
      path: '/vendor-portal',
      name: 'vendor-portal',
      component: vendorPortal
    },
    {
      path: '/vendor',
      name: 'vendor',
      component: vendor
    },
    {
      path: '/vendor/:vendorID',
      name:'vendor-display',
      component: VendorDisplay
    },
    {
      path: '/vendor/edit/:vendorID',
      name:'vendor-edit',
      component: EditVendor
    },
    {
      path: '/fabric',
      name: 'fabric',
      component: Fabric
    },
    {
      path: '/fabric-portal',
      name: 'fabric-portal',
      component: FabricPortal
    },
    {
      path: '/fabric/:fabricID',
      name: 'fabric-display',
      component: FabricDisplay
    },
    {
      path: '/fabric/edit/:fabricID',
      name: 'fabric-edit',
      component: EditFabric
    },
    {
      path: '/sales',
      name: 'sales',
      component: Sales
    },
    {
      path: '/sales/:salesOrderID',
      name: 'showSalesOrder',
      component: SalesOrderDisplay
    },
    {
      path: '/sales-portal',
      name: 'sales-portal',
      component: SalesPortal
    },
    {
      path: '/sales/edit/:salesID',
      name: 'sales-edit',
      component: EditSales
    },
    {
      path: '/po-dashboard',
      name: 'po-dashboard',
      component: PoDashBoard
    },
    {
      path: '/po-dashboardv2',
      name: 'po-dashboardv2',
      component: PoDashBoardv2
    },
    {
      path: '/fpo/new/',
      name: 'fpoViaSales',
      component: FPO
    },
    {
      path: '/fpo-portal',
      name: 'fpo-portal',
      component: FPOPortal
    },
    {
      path: '/fpo/:fpoID',
      name: 'fpo-display',
      component: FPODisplay
    },
    {
      path: '/fpo/edit/:fpoID',
      name: 'fpo-edit',
      component: EditFPO
    },
    {
        path: '/lpo-portal',
      name: 'lpo-portal',
      component: LPOPortal
    },
    {
      path: '/lpo/new/',
      name: 'lpoViaSales',
      component: LPO
    },
    {
      path: '/lpo/:lpoID',
      name: 'lpo-display',
      component: LPODisplay
    },
    {
      path: '/lpo/edit/:lpoID',
      name: 'lpo-edit',
      component: EditLPO
    },
    {
      path: '/apo/new',
      name: 'apo',
      component: APO
    },
    {
      path: '/apo-portal',
      name: 'apo-portal',
      component: APOPortal
    },
    {
      path: '/apo/:apoID',
      name: 'apo-display',
      component: APODisplay
    },
    {
      path: '/apo/edit/:apoID',
      name: 'apo-edit',
      component: EditAPO
    },
     {
      path: '/fabric-images',
      name: 'imagesPortal',
      component: FabricImages
    },
    {
      path: '/addfabricimage',
      name: 'addfabricimage',
      component: AddFabricImages
    },

  ]
})
