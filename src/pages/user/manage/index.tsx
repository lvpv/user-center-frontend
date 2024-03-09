import { searchUser } from '@/services/user/user';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Image, Table, Tag } from 'antd';
import React, { useRef } from 'react';

const columns: ProColumns<AUTH.UserResponse>[] = [
  {
    dataIndex: 'index',
    title: '序号',
    valueType: 'index',
    align: 'center',
    search: false,
    width: 50,
  },
  {
    dataIndex: 'id',
    title: '编号',
    align: 'center',
    search: false,
    width: 80,
  },
  {
    dataIndex: 'username',
    title: '用户名',
    ellipsis: true,
    align: 'center',
    width: 100,
    copyable: true,
  },
  {
    dataIndex: 'nickname',
    title: '昵称',
    ellipsis: true,
    align: 'center',
    search: false,
    copyable: true,
  },
  {
    dataIndex: 'avatar',
    title: '头像',
    search: false,
    align: 'center',
    render: (_, record) => <Image src={record.avatar} width={64} />,
  },
  {
    dataIndex: 'phone',
    title: '电话',
    ellipsis: true,
    search: false,
    align: 'center',
    copyable: true,
  },
  {
    dataIndex: 'email',
    title: '邮箱',
    ellipsis: true,
    search: false,
    align: 'center',
    copyable: true,
    width: 220,
  },
  {
    dataIndex: 'gender',
    title: '性别',
    align: 'center',
    ellipsis: true,
    search: false,
    valueEnum: {
      0: { text: '未知', status: 'Warning' },
      1: { text: '男', status: 'Success' },
      2: { text: '女', status: 'Error' },
    },
  },
  {
    dataIndex: 'role',
    title: '角色',
    search: false,
    align: 'center',
    valueEnum: {
      0: { text: '普通用户', status: 'Warning' },
      1: { text: '管理员', status: 'Success' },
    },
  },
  {
    dataIndex: 'status',
    align: 'center',
    title: '状态',
    search: false,
    render: (_, record) =>
      record?.status && record?.status === 0 ? (
        <Tag color="success">正常</Tag>
      ) : (
        <Tag color="error">禁用</Tag>
      ),
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'createTime',
    valueType: 'dateTime',
    search: false,
    width: 200,
    align: 'center',
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    align: 'center',
    fixed: 'right',
    render: (_, record) => [
      <Button type="link" key="editor">
        编辑-{record?.id}
      </Button>,
      <Button type="link" key="delete" danger>
        删除
      </Button>,
    ],
  },
];

const UserManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer>
      <ProTable<AUTH.UserResponse>
        columns={columns}
        actionRef={actionRef}
        bordered
        request={async (params) => {
          const users = await searchUser(params?.username);
          return { data: users };
        }}
        columnEmptyText="无"
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          alwaysShowAlert: true,
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
        }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        options={{ setting: { listsHeight: 500 } }}
        pagination={{
          pageSize: 10,
          current: 1,
          onChange: (page, pageSize) => console.log(page, pageSize),
        }}
        dateFormatter="string"
        headerTitle="用户管理"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
            type="primary"
          >
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default UserManage;
