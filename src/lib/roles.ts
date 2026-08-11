export const Roles = {
    ADMIN: "ADMIN",
    RMD: "RMD",
    RETAILER: "RETAILER",
    WHOLESALER: "WHOLESALER",
    WORKER: "WORKER",
    SHIPPER: "SHIPPER",
    FACTORY: "FACTORY",
    USER: "USER",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];