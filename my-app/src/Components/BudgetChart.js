import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import './BudgetChart.css'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin
  );
  
  export default function BudgetChart ({ entries, budgetLimit })
   {
    const [filteredEntries, setFilteredEntries] = useState(entries);
    const [filter, setFilter] = useState('last12Months');
  
    useEffect(() => {
      const today = new Date();
      let filteredData;
  
      switch (filter) {
        case 'lastMonth':
          filteredData = entries.filter(entry => {
            const entryDate = new Date(entry.date);
            const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            return entryDate >= lastMonth;
          });
          break;
        case 'last6Months':
          filteredData = entries.filter(entry => {
            const entryDate = new Date(entry.date);
            const last6Months = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
            return entryDate >= last6Months;
          });
          break;
        case 'last12Months':
        default:
          filteredData = entries.filter(entry => {
            const entryDate = new Date(format(entry.date, "yyyy-MM-dd"));
            const last12Months = new Date(today.getFullYear(), today.getMonth() - 12, today.getDate());
            return entryDate >= last12Months;
          });
          break;
      }
  
      setFilteredEntries(filteredData);
    }, [entries, filter]);
  
    const data = {
      labels: filteredEntries.map(entry => entry.date),
      datasets: [
        {
          label: 'Expenses',
          data: filteredEntries.map(entry => entry.price),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  
    const options = {
        scales: {
            x: {
                type: 'category',
                ticks: {
                    callback: function (value, index) {
                        const date = new Date(filteredEntries[index].date);
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                    }
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            annotation: {
                annotations: {
                    budgetLimitLine: {
                        type: 'line',
                        yMin: budgetLimit,
                        yMax: budgetLimit,
                        borderColor: 'red',
                        borderWidth: 2,
                        label: {
                            content: `Budget Limit: ${budgetLimit}`,
                            enabled: true,
                            position: 'end',
                            backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        },
                    },
                },
            },
            legend: {
                display: true,
            },
        },
    };
    return (
      <div>
        <div>
          <label htmlFor="filter">Filter:</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="lastMonth">Last Month</option>
            <option value="last6Months">Last 6 Months</option>
            <option value="last12Months">Last 12 Months</option>
          </select>
        </div>
  
        <Line data={data} options={options} />
      </div>
    );
  };
