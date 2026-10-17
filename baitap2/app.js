const devices = [];

const validateDevice = (device) => {
    return (
        device.name !== undefined &&
        device.name.trim() !== "" &&
        device.room !== undefined &&
        device.room.trim() !== "" &&
        typeof device.powerWatts === "number" &&
        device.powerWatts > 0
    );
};

const createDevice = (list, newDev) => {
    if (!validateDevice(newDev)) {
        return false;
    }

    let maxId = 0;

    for (let i = 0; i < list.length; i++) {
        const number = Number(list[i].id.replace("DEV_", ""));

        if (number > maxId) {
            maxId = number;
        }
    }

    const device = {
        id: `DEV_${String(maxId + 1).padStart(3, "0")}`,
        name: newDev.name,
        room: newDev.room,
        powerWatts: newDev.powerWatts,
        isActive: newDev.isActive !== undefined ? newDev.isActive : true
    };

    list.push(device);
    return device;
};

const readDevicesByRoom = (list, roomName) => {
    return list.filter(device => device.room === roomName);
};

const updateDevice = (list, id, updateData) => {
    const targetDevice = list.find(device => device.id === id);

    if (targetDevice === undefined) {
        return false;
    }

    if (
        updateData.name !== undefined &&
        (typeof updateData.name !== "string" || updateData.name.trim() === "")
    ) {
        return false;
    }

    if (
        updateData.room !== undefined &&
        (typeof updateData.room !== "string" || updateData.room.trim() === "")
    ) {
        return false;
    }

    if (
        updateData.powerWatts !== undefined &&
        (typeof updateData.powerWatts !== "number" || updateData.powerWatts < 0)
    ) {
        return false;
    }

    if (
        updateData.isActive !== undefined &&
        typeof updateData.isActive !== "boolean"
    ) {
        return false;
    }

    if (updateData.name !== undefined) {
        targetDevice.name = updateData.name;
    }

    if (updateData.room !== undefined) {
        targetDevice.room = updateData.room;
    }

    if (updateData.powerWatts !== undefined) {
        targetDevice.powerWatts = updateData.powerWatts;
    }

    if (updateData.isActive !== undefined) {
        targetDevice.isActive = updateData.isActive;
    }

    return true;
};

const deleteDevice = (list, id) => {
    const index = list.findIndex(device => device.id === id);

    if (index === -1) {
        return false;
    }

    list.splice(index, 1);
    return true;
};

console.log("=== 1. THÊM THIẾT BỊ ===");

console.log(createDevice(devices, {
    name: "Điều hòa",
    room: "Phòng khách",
    powerWatts: 1500
}));

console.log(createDevice(devices, {
    name: "Đèn ngủ",
    room: "Phòng ngủ",
    powerWatts: 10
}));

console.log("Thêm thiết bị thiếu tên:", createDevice(devices, {
    name: "",
    room: "Phòng bếp",
    powerWatts: 500
}));

console.log("=== 2. XEM THIẾT BỊ THEO PHÒNG ===");
console.log(readDevicesByRoom(devices, "Phòng khách"));

console.log("=== 3. CẬP NHẬT THIẾT BỊ ===");
console.log(
    "Tắt điều hòa:",
    updateDevice(devices, "DEV_001", { isActive: false })
);

console.log(
    "Đặt công suất đèn về 0W:",
    updateDevice(devices, "DEV_002", { powerWatts: 0 })
);

console.log(
    "Cập nhật ID không tồn tại:",
    updateDevice(devices, "DEV_999", { isActive: true })
);

console.log(devices);

console.log("=== 4. XÓA THIẾT BỊ ===");
console.log("Xóa đèn ngủ:", deleteDevice(devices, "DEV_002"));
console.log("Xóa ID không tồn tại:", deleteDevice(devices, "DEV_999"));
console.log(devices);
