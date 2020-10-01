const menuList = [
    {
        title: 'main page',
        key: '/home'
    },
    {
        title: 'UI',
        key: '/ui',
        children: [
            {
                title: 'button',
                key: '/ui/buttons',
            },
            {
                title: 'bullet frame',
                key: '/ui/modals',
            },
            {
                title: 'Loading',
                key: '/ui/loadings',
            },
            {
                title: 'remind',
                key: '/ui/notification',
            },
            {
                title: 'Global Message',
                key: '/ui/messages',
            },
            {
                title: 'Tab',
                key: '/ui/tabs',
            },
            {
                title: 'picture',
                key: '/ui/gallery',
            },
            {
                title: 'Carousel',
                key: '/ui/carousel',
            }
        ]
    },
    {
        title: 'Table',
        key: '/form',
        children: [
            {
                title: 'sign in',
                key: '/form/login',
            },
            {
                title: 'sign up',
                key: '/form/reg',
            }
        ]
    },
    {
        title: 'Table',
        key: '/table',
        children: [
            {
                title: 'basic table',
                key: '/table/basic',
            },
            {
                title: 'Advanced table',
                key: '/table/high',
            }
        ]
    },
    {
        title: 'document',
        key: '/rich'
    },
    {
        title: 'city management',
        key: '/city'
    },
    {
        title: 'order management',
        key: '/order',
        btnList: [
            {
                title: 'order details',
                key: 'detail'
            },
            {
                title: 'ended orders',
                key: 'finish'
            }
        ]
    },
    {
        title: 'Employee management',
        key: '/user'
    },
    {
        title: 'Map',
        key: '/bikeMap'
    },
    {
        title: 'Icon',
        key: '/charts',
        children: [
            {
                title: 'bar',
                key: '/charts/bar'
            },
            {
                title: 'pie',
                key: '/charts/pie'
            },
            {
                title: 'line',
                key: '/charts/line'
            },
        ]
    },
    {
        title: 'permission',
        key: '/permission'
    },
];
export default menuList;