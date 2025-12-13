import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import colors from "tailwindcss/colors";


const COLORS = [colors.gray[800],colors.green[500],colors.green[900]];

const AdminPieChart = ({manager,landowner,proposal,acc,rej,pen}) => {

    const data=[
        {name:"Manager",value:manager},
        {name:"Landowner",value:landowner},
    ];
    const proposal_data=[{name:"Accepected ",value:acc},
        {name:"Reject",value:rej},
        {name:"Pending",value:pen},
    ];
    return(
        <div className='flex flex-row gap-40'>
            <div className=" p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                        rounded-2xl flex-col gap-2 border-0 border-green-100 
                        shadow-2xl w-100 h-85 fixed top-40 left-5 ">
                    <p className='text-center text-sm'>Total Users ( {manager+landowner} ) </p>        
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            animationDuration={30}
                            
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>

                        <div className=" p-7 bg-gray-100/50 drop-shadow-md backdrop-blur-lg
                        rounded-2xl flex-col gap-2 border-0 border-green-100 
                        shadow-2xl w-100 h-85 fixed top-40 left-120 ">
                    <p className='text-center text-sm'>Total proposal ( {proposal} ) </p>         
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={proposal_data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            animationDuration={30}
                            
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>


        </div>



    );

};

export default AdminPieChart;
