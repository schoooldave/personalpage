export function clampProgress(value:number){ return Math.min(1, Math.max(0,value)); }
export function sceneFromProgress(value:number){ return Math.min(2, Math.floor(clampProgress(value)*3)); }
