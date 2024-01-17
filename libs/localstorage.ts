/**
 * 1. 컴포넌트 : ylblog\src\app\components\common\functions\localstorage.ts
 * 2. 작성일 : 2023.08.09 / 19시 26분 28초
 * 3. 작성자 : 홍예림
 * 4. 설명 : localStorage class 모듈화 -> ssr 인식 불가 방지
 */

class LocalStorage {
  constructor() {
    //
  }

  static setItem(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  static getItem(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

export default LocalStorage;
