const menuList = [
    {
        title: 'Main page',
        key: '/home'
    },
    {
        title: 'Log in',
        key: '/form',
        children: [
            {
                title: 'Sign in',
                key: '/form/login',
            },
            {
                title: 'Sign up',
                key: '/form/register',
            }
        ]
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
    {
        title: 'Charts',
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
];
export default menuList;