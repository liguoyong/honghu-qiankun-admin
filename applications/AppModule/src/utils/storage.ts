export default {
    // 存储数据到sessionStorage
    setItem<T>(key: string, value: T): void {
        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
    },

    // 从sessionStorage中获取数据
    getItem<T>(key: string): T | null | string {
        const value = sessionStorage.getItem(key);
        if (value && typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch (error) {
                // 如果解析失败，则直接返回原始字符串
                return value;
            }
        }
        return null;
    },

    // 从sessionStorage中移除数据
    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    },

    // 清空sessionStorage中的所有数据
    clear(): void {
        sessionStorage.clear();
    }
};