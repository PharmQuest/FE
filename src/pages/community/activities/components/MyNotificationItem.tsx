import React from "react";

interface MyNotificationItemProps {
  id: number;
  writer: string;
  content: string;
  title: string;
  date: string;
}

const MyNotificationItem: React.FC<MyNotificationItemProps> = ({
  writer,
  content,
  title,
  date,
}) => {
  return (
    <div className="py-3 pr-3 flex flex-row justify-between border-b border-solid border-gray-100">
      <div className="flex flex-row gap-2 items-start">
        <input type="checkbox" className="box-border mt-1" />
        <div className="flex flex-col gap-2">
          <p className="text-body1-r text-gray-500">
            {writer} : {content}
          </p>
          <p className="text-body1-r text-gray-200">[{title}]</p>
        </div>
      </div>
      <div>
        <p className="text-body2-r text-gray-300 ml-4">{date}</p>
      </div>
    </div>
  );
};

export default MyNotificationItem;
