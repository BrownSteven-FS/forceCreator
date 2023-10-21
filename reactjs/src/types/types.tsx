export enum UnitType {
  T = "T",
  U = "U",
}
export enum UnitEchelon {
  ARMY = "ARMY",
  DIV = "DIV",
  RGT = "RGT",
  CMD = "CMD",
  BDE = "BDE",
  BN = "BN",
  CO = "CO",
  PLT = "PLT",
}

export interface Unit {
  id: string;
  type: UnitType;
  name: string;
  parent: string;
  uic: string;
  echelon: UnitEchelon;
  unit_class: string;
  template: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
}

export const defaultUnitState: Partial<Unit> = {
  id: "",
  type: UnitType.T,
  name: "",
  parent: "TOP",
  uic: "",
  echelon: UnitEchelon.ARMY,
  unit_class: "",
  template: "",
  symbol: "",
};

export interface User {
  token: string;
  userId: string;
}
