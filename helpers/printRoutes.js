module.exports = function (routes, src, mount) {

    const Table = require('cli-table');
    const table = new Table({ head: ["Path " + (mount || ""), ""] });

    // console.log('\nAPI for this app');
    console.log('\n********************************************');
    console.log('\t\t', src.toUpperCase());
    console.log('********************************************\n');
    for (const key in routes) {
        if (routes.hasOwnProperty(key)) {
            const val = routes[key];
            if (val.route) {
                val = val.route;
                const _o = {},
                    methods = [];
                _o[val.path] = Object.keys(val.methods);
                table.push(_o);
            }
        }
    }
    console.log(table.toString());

    return table;
}; d