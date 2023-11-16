
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    }
    catch(error) {
        return false
    }
    return true
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
})

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const renderOptions = (arr) => {
    let results = []
    if(arr) {
        results = arr?.map((item) => {
            return {
                value: item,
                label: item
            }
        })
    }
    results.push({
        value: 'add_type',
        label: 'Thêm type'
    })
    return results
}

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString()
        return `${result}.000 đ`
    } catch {
        return null
    }
}