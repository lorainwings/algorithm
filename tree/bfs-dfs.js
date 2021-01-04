
const d = [
    {
        "DemographicId": 1,
        "ParentId": null,
        "Name": "United States of America",
        "Description": "United States of America",
        "Area": 9826675,
        "Population": 918212000,
        "TimeZone": "UTC -5 to -10",
        "children": [
            {
                "DemographicId": 2,
                "ParentId": 1,
                "Name": "California",
                "Description": "The Tech State",
                "Area": 423970,
                "Population": 38340000,
                "TimeZone": "Pacific Time",
                "children": [
                    {
                        "DemographicId": 3,
                        "ParentId": 2,
                        "Name": "San Francisco",
                        "Description": "The happening city",
                        "Area": 231,
                        "Population": 837442,
                        "TimeZone": "PST"
                    },
                    {
                        "DemographicId": 4,
                        "ParentId": 2,
                        "Name": "Los Angeles",
                        "Description": "Disco city",
                        "Area": 503,
                        "Population": 3904657,
                        "TimeZone": "PST"
                    }
                ]
            },
            {
                "DemographicId": 12,
                "ParentId": 1,
                "Name": "California",
                "Description": "The Tech State2314",
                "Area": 42393424124170,
                "Population": 383404312412000,
                "TimeZone": "Pacific Time213412341"
            },
            {
                "DemographicId": 22,
                "ParentId": 1,
                "Name": "California",
                "Description": "The Tech State12312",
                "Area": 3412412,
                "Population": 383400431241200,
                "TimeZone": "Pacific Time1234124"
            },
            {
                "DemographicId": 5,
                "ParentId": 1,
                "Name": "Illinois",
                "Description": "Not so cool",
                "Area": 57914,
                "Population": 12882135,
                "TimeZone": "Central Time Zone",
                "children": [
                    {
                        "DemographicId": 6,
                        "ParentId": 5,
                        "Name": "Chicago",
                        "Description": "Financial City",
                        "Area": 234,
                        "Population": 2695598,
                        "TimeZone": "CST"
                    }
                ]
            },
            {
                "DemographicId": 7,
                "ParentId": 1,
                "Name": "Texas",
                "Description": "Rances, Oil & Gas",
                "Area": 268581,
                "Population": 26448193,
                "TimeZone": "Mountain"
            },
            {
                "DemographicId": 8,
                "ParentId": 1,
                "Name": "New York",
                "Description": "The largest diverse city",
                "Area": 141300,
                "Population": 19651127,
                "TimeZone": "Eastern Time Zone",
                "children": [
                    {
                        "DemographicId": 14,
                        "ParentId": 8,
                        "Name": "Manhattan",
                        "Description": "Time Square is the place",
                        "Area": 269.403,
                        "Population": 0,
                        "TimeZone": "EST",
                        "children": [
                            {
                                "DemographicId": 15,
                                "ParentId": 14,
                                "Name": "Manhattan City",
                                "Description": "Manhattan island",
                                "Area": 33.77,
                                "Population": 0,
                                "TimeZone": "EST"
                            },
                            {
                                "DemographicId": 16,
                                "ParentId": 14,
                                "Name": "Time Square",
                                "Description": "Time Square for new year",
                                "Area": 269.4,
                                "Population": 0,
                                "TimeZone": "EST"
                            }
                        ]
                    },
                    {
                        "DemographicId": 17,
                        "ParentId": 8,
                        "Name": "Niagra water fall",
                        "Description": "Close to Canada",
                        "Area": 65.7,
                        "Population": 0,
                        "TimeZone": "EST"
                    },
                    {
                        "DemographicId": 18,
                        "ParentId": 8,
                        "Name": "Long Island",
                        "Description": "Harbour to Atlantic",
                        "Area": 362.9,
                        "Population": 0,
                        "TimeZone": "EST"
                    }
                ]
            },
            {
                "DemographicId": 51,
                "ParentId": 1,
                "Name": "All_Other",
                "Description": "All_Other demographics",
                "Area": 0,
                "Population": 0,
                "TimeZone": 0
            }
        ]
    },
    {
        "DemographicId": 201,
        "ParentId": null,
        "Name": "India",
        "Description": "Hydrabad tech city",
        "Area": 5566.9,
        "Population": 718212000,
        "TimeZone": "IST"
    },
    {
        "DemographicId": 301,
        "ParentId": null,
        "Name": "Bangladesh",
        "Description": "Country of love",
        "Area": 5566.78,
        "Population": 718212004,
        "TimeZone": "BST"
    }
]


// 深度优先遍历
const dfs = (tree) => {
    // 单节点深度遍历
    const df = (t) => {
        console.log(t);
        if (t.children) {
            t.children.forEach(df)
        }
    }
    // 所有节点总遍历
    tree.forEach(df);
}

const bfs = (tree) => {
    // 单节点广都遍历
    const bf = (t) => {
        const stack = [];
        stack.push(t);
        while (stack.length) {
            const item = stack.shift();
            console.log(item);
            if (item.children) {
                stack.push(...item.children);
            }
        }
    }

    // 所有节点总遍历
    tree.forEach(bf);
}



// console.group("====原始=====");

// console.log(d);

// console.group("====深度=======");

// dfs(d);

// console.group("====广度=======");

// bfs(d);