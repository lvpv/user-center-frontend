import { authRegister } from '@/services/auth';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { history, Link } from '@umijs/max';
import { Button, message } from 'antd';
import { useRef } from 'react';
import useStyles from './style.style';

export default () => {
  const { styles } = useStyles();
  const formRef = useRef<ProFormInstance>();

  const handlerRegister = (values: any) => {
    return new Promise<boolean>((resolve, reject) => {
      authRegister(values)
        .then(async (data: any) => {
          if (data > 0) {
            await message.success('注册成功！');
            history.replace({
              pathname: `/auth/register-result?account=${values['username']}`,
            });
            return resolve(true);
          } else {
            await message.error('注册失败！');
            return reject(false);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && (value.length < 8 || value.length > 20)) {
      return promise.reject('确认密码长度必须大于8位小于20位');
    }
    if (value && value !== formRef.current?.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>注册</div>
      <ProForm
        title="用户注册"
        formRef={formRef}
        submitter={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render: (props) => {
            return (
              <div className={styles.buttonGroup}>
                <Button
                  type="primary"
                  onClick={props.submit}
                  // @ts-ignore
                  loading={props.submitButtonProps?.loading}
                >
                  注册
                </Button>
                <Button onClick={props.reset} className={styles.resetButton}>
                  重置
                </Button>
                <Link to="/auth/login" className={styles.loginLink}>
                  {' '}
                  已有账号,去登录
                </Link>
              </div>
            );
          },
        }}
        onFinish={(values) => {
          return handlerRegister(values);
        }}
      >
        <ProFormText
          name="username"
          label="用户名"
          tooltip="用户名长度大于4位小于15位"
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '用户名是必填项！',
            },
            {
              type: 'string',
              min: 4,
              max: 15,
              message: '用户名长度不能小于4位大于15位！',
            },
          ]}
        />

        <ProFormText.Password
          placeholder="请输入密码"
          label="密码"
          tooltip="密码长度大于8位小于20位"
          name="password"
          rules={[
            {
              required: true,
              message: '密码是必填项！',
            },
            {
              type: 'string',
              min: 8,
              max: 20,
              message: '密码长度不能小于8位大于20位！',
            },
          ]}
        />
        <ProFormText.Password
          label="确认密码"
          tooltip="密码长度大于8位小于20位"
          placeholder="请输入确认密码"
          name="checkPassword"
          rules={[
            {
              required: true,
              message: '密码是必填项！',
            },
            {
              validator: checkConfirm,
            },
          ]}
        />
      </ProForm>
    </div>
  );
};
