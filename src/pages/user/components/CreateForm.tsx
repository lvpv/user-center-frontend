import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import { FC } from 'react';
interface CreateFormProps {
  reload?: ActionType['reload'];
}
const CreateForm: FC<CreateFormProps> = (props) => {
  const { reload } = props;
  const [messageApi, contextHolder] = message.useMessage();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const { run, loading } = useRequest({
    manual: true,
    onSuccess: () => {
      messageApi.success('Added successfully');
      reload?.();
    },
    onError: () => {
      messageApi.error('Adding failed, please try again!');
    },
  });
  return (
    <>
      {contextHolder}
      <ModalForm
        title={'新建规则'}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            新建
          </Button>
        }
        width="400px"
        modalProps={{
          okButtonProps: {
            loading,
          },
        }}
        onFinish={async (value) => {
          await run({
            data: value as any,
          });
          return true;
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
    </>
  );
};
export default CreateForm;
