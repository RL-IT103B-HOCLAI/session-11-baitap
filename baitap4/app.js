
const devices = [
    {
        id: "DEV01",
        name: "Điều hòa",
        powerWatts: 1500,
        isActive: true
    },
    {
        id: "DEV02",
        name: "Quạt",
        powerWatts: 60,
        isActive: true
    },
    {
        id: "DEV03",
        name: "Đèn",
        powerWatts: 40,
        isActive: true
    }
];

const findDeviceById = (list, id) => {
    return list.find(device => device.id === id);
};

const updateDeviceState = (list, id, updateData) => {
    const device = findDeviceById(list, id);

    if (device === undefined) {
        return false;
    }

    if (updateData.isActive !== undefined) {
        device.isActive = updateData.isActive;
    }

    if (updateData.powerWatts !== undefined) {
        if (typeof updateData.powerWatts !== "number" || updateData.powerWatts < 0) {
            return false;
        }

        device.powerWatts = updateData.powerWatts;
    }

    return true;
};

const calculateActivePower = (list) => {
    let totalPower = 0;

    list.forEach(device => {
        if (device.isActive) {
            totalPower += device.powerWatts;
        }
    });

    return totalPower;
};

console.log("===== TRƯỚC KHI CẬP NHẬT =====");
console.log("Danh sách thiết bị:", devices);
console.log("Tổng công suất:", calculateActivePower(devices), "W");

console.log("===== CẬP NHẬT THIẾT BỊ =====");

console.log(
    "Tắt điều hòa DEV01:",
    updateDeviceState(devices, "DEV01", {
        isActive: false
    })
);

console.log(
    "Hạ công suất đèn DEV03 về 0W:",
    updateDeviceState(devices, "DEV03", {
        powerWatts: 0
    })
);

console.log("===== SAU KHI CẬP NHẬT =====");
console.log("Danh sách thiết bị:", devices);
console.log("Trạng thái DEV01:", findDeviceById(devices, "DEV01"));
console.log("Trạng thái DEV03:", findDeviceById(devices, "DEV03"));
console.log("Tổng công suất:", calculateActivePower(devices), "W");
