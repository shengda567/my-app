const menuList = [
    {
        title: 'Home',
        key: '/admin/home'
    },
    /* {
        title: 'UI',
        key: '/admin/ui',
        children: [
            {
                title: 'button',
                key: '/admin/ui/buttons',
            },
            {
                title: 'bullet frame',
                key: '/admin/ui/modals',
            },
            {
                title: 'Loading',
                key: '/admin/ui/loadings',
            },
            {
                title: 'remind',
                key: '/admin/ui/notification',
            },
            {
                title: 'Global Message',
                key: '/admin/ui/messages',
            },
            {
                title: 'Tab',
                key: '/admin/ui/tabs',
            },
            {
                title: 'picture',
                key: '/admin/ui/gallery',
            },
            {
                title: 'Carousel',
                key: '/admin/ui/carousel',
            }
        ]
    },
    {
        title: 'Table',
        key: '/admin/form',
        children: [
            {
                title: 'sign in',
                key: '/admin/form/login',
            },
            {
                title: 'sign up',
                key: '/admin/form/reg',
            }
        ]
    },
    {
        title: 'Table',
        key: '/admin/table',
        children: [
            {
                title: 'basic table',
                key: '/admin/table/basic',
            },
            {
                title: 'Advanced table',
                key: '/admin/table/high',
            }
        ]
    },
    {
        title: 'document',
        key: '/admin/rich'
    }, */
    {
        title: 'Cities',
        key: '/admin/city'
    },
    {
        title: 'Orders',
        key: '/admin/order',
        btnList: [
            {
                title: 'Order details',
                key: 'detail'
            },
            {
                title: 'Completed orders',
                key: 'finish'
            }
        ]
    },
    {
        title: 'Employees',
        key: '/admin/user'
    },
    {
        title: 'Map',
        key: '/admin/bikeMap'
    },
    {
        title: 'Charts',
        key: '/admin/charts',
        children: [
            {
                title: 'Bar',
                key: '/admin/charts/bar'
            },
            {
                title: 'Pie',
                key: '/admin/charts/pie'
            },
            {
                title: 'Line',
                key: '/admin/charts/line'
            },
        ]
    },
    /*{
        title: 'permission',
        key: '/admin/permission'
    },*/
];
export default menuList;