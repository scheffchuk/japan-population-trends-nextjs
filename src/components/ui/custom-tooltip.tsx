import React from "react";

type CustomTooltipProps = {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string | number;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-sm border bg-white p-3 shadow-sm">
      <p className="font-bold dark:text-gray-800">{label}</p>
      <div className="dark:bg-opacity-20 w-full rounded-full bg-gray-200 py-[0.5px] sm:block"></div>
      {payload.map((entry, index) => {
        // Extract the prefecture code from the dataKey
        const prefCode = entry.dataKey;
        // Check if there's a corresponding rate entry
        const rateKey = `${prefCode}_rate`;
        const rateValue = entry.payload[rateKey];

        return (
          <div key={index} className="flex flex-row">
            <p className="my-1" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
            {rateValue !== undefined && (
              <p className="my-1 ml-4 text-gray-600">
                ({rateValue.toFixed(2)}%)
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomTooltip;
