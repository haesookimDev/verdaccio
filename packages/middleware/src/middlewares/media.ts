import { HEADER_TYPE, HTTP_STATUS, errorUtils } from '@verdaccio/core';

import { $NextFunctionVer, $RequestExtend, $ResponseExtend } from '../types';

export function media(expect: string | null): any {
  return function (req: $RequestExtend, res: $ResponseExtend, next: $NextFunctionVer): void {
    const header = req.headers[HEADER_TYPE.CONTENT_TYPE];
    if (!header) {
      next(
        errorUtils.getCode(
          HTTP_STATUS.UNSUPPORTED_MEDIA,
          'content-type is missing, expect: ' + expect
        )
      );
      return;
    }

    if (typeof header !== 'string' || header.split(';')[0].trim() !== expect) {
      next(
        errorUtils.getCode(
          HTTP_STATUS.UNSUPPORTED_MEDIA,
          'wrong content-type, expect: ' + expect + ', got: ' + req.get[HEADER_TYPE.CONTENT_TYPE]
        )
      );
    } else {
      next();
    }
  };
}
