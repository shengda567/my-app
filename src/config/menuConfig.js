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

        key: '/charts',

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