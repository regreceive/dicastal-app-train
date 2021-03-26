import { IApi, utils } from 'umi';
import { join } from 'path';
import { readFileSync } from 'fs';

export default (api: IApi) => {
  /**
   * 改造umi默认的history，使其在push/replace时通知portal来完成相关操作
   */
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join('core', 'history.ts'),
      content: readFileSync(join(__dirname, 'historyContent.ts'), 'utf-8'),
    });
  });
};
