import { deleteUser, searchUser } from '@/services/user/user';
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Image, message, Table, Tag } from 'antd';
import React, { useRef } from 'react';

const UserManage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const deleteUserById = async (id: number) => {
    await deleteUser(id);
    await message.success('删除成功！');
    actionRef?.current?.reload();
  };

  const columns: ProColumns<AUTH.UserResponse>[] = [
    {
      dataIndex: 'index',
      title: '序号',
      valueType: 'index',
      align: 'center',
      search: false,
    },
    {
      dataIndex: 'id',
      title: '编号',
      align: 'center',
      search: false,
    },
    {
      dataIndex: 'username',
      title: '用户名',
      ellipsis: true,
      align: 'center',
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
      width: 80,
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
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, record) => [
        <div
          style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
          key="option"
        >
          <Button key="editor" type="link">
            <EditOutlined />
            编辑-{record.id}
          </Button>
          <Button
            key="delete"
            type="link"
            danger
            onClick={() => deleteUserById(record?.id as number)}
          >
            <DeleteOutlined />
            删除
          </Button>
        </div>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<AUTH.UserResponse>
        columns={columns}
        actionRef={actionRef}
        bordered
        scroll={{ x: 'max-content' }}
        request={async (params) => {
          const users = await searchUser({ username: params?.username });
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
            key="add"
            ghost
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
          >
            新建
          </Button>,
          <Button key="batchDelete" icon={<DeleteOutlined />} danger>
            批量删除
          </Button>,
          <Button key="batchDelete" icon={<ExportOutlined />} type="dashed">
            导出
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default UserManage;
