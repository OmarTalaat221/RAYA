import { Table } from "antd";
import "./style.css"

export default function CustomeTabel({ data, headers, pagination }) {

    console.log(data);
    console.log(headers);

    return (
        <section className="w-full" dir="rtl">
            <div className="mx-auto max-w-[880px]">
                <div className="overflow-hidden rounded-[6px] ">
                    <Table
                        columns={headers}
                        dataSource={data}
                        pagination={pagination}
                        rowKey="key"
                        className="custom-orders-table"
                    // scroll={{ x: 760 }}
                    />
                </div>
            </div>


        </section>
    );
}