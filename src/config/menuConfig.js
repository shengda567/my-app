const menuList = [
    {
        title: 'Main page',
        key: '/home'
    },
    {
        title: 'City Management',
        key: '/city'
    },
    {
        title: 'Order Management',
        key: '/order',
        btnList: [
            {
                title: 'Order details',
                key: 'detail'
            },
            {
                title: 'Ended orders',
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
];
export default menuList;