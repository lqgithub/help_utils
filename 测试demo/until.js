const point = {
x: 0,
y: 0
}
   // 帮助类
   const utilHelps = {
    /**
    * 根据向量计算角A度数/有缺陷，无法算负角度
    * @param {point} pointA 
    * @param {point} pointB 
    * @param {point} pointC 
    * @returns {string}
    */
    getAngle(pointA, pointB, pointC) {
    if (!pointA || !pointB) {
    return console.error("参数缺失");
    }
    if (!pointC) {
    pointC = {
    x: pointA.x + 100,
    y: pointA.y
    }
    }
    //向量
    const BA = {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y
    }
    const CA = {
    x: pointC.x - pointA.x,
    y: pointC.y - pointA.y
    }
    // 计算叉积
    const crossProduct = BA.x * CA.y - BA.y * CA.x;
    let direction;
    if(crossProduct > 0){
    direction = -1; //逆时针 
    }else if(crossProduct < 0){
    direction = 1; //顺时针
    }else{
    direction = 0; //同线
    }
    // 计算向量点积/模长
    const dotProduct = BA.x * CA.x + BA.y * CA.y;
    const magnitude1 = Math.sqrt(BA.x * BA.x + BA.y * BA.y);
    const magnitude2 = Math.sqrt(CA.x * CA.x + CA.y * CA.y);
   
    // 计算角度（以弧度为单位） 
    const angleInRadians = Math.acos(dotProduct / (magnitude1 * magnitude2));
   
    // 将弧度转换为角度（以度为单位） 
    const Angle = angleInRadians * (180 / Math.PI);
   
    return Angle.toFixed(); //取整字符串
    },
    /**
    * 计算斜率，垂直是Infinity
    * @param {object} pointA 
    * @param {object} pointB 
    * @returns 
    */
    getLineK(pointA, pointB) {
    const x = pointB.x - pointA.x
    const y = pointB.y - pointA.y
    let k = y / x
    return k
    },
    projectVector(AC, AB) {
    // 计算向量AB的模长
    const AB_length = Math.sqrt(AB.reduce((acc, val) => acc + val * val, 0));
   
    // 计算向量AB的单位向量
    const AB_unit = AB.map(val => val / AB_length);
   
    // 计算向量AC在向量AB上的投影长度
    const proj_length = AC.reduce((acc, val, i) => acc + val * AB_unit[i], 0);
   
    // 计算投影向量
    const proj_vec = AB_unit.map(val => val * proj_length);
   
    return proj_vec;
    },
    /**
    * 计算垂足
    * @param {point} A 
    * @param {point} B 
    * @param {point} C 
    * @returns 
    */
    projectFootPoint(A, B, C) {
    //中点
    const centerPoint = {
    x: (A.x + B.x) / 2,
    y: (A.y + B.y) / 2
    }
    //向量
    const AB = {
    x: B.x - A.x,
    y: B.y - A.y
    }
    const AC = {
    x: C.x - A.x,
    y: C.y - A.y
    }
    //计算向量AB模长
    const lengthAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y)
    //半长
    const halfLength = lengthAB / 2
    //计算AB单位向量
    const _AB = {
    x: AB.x / lengthAB,
    y: AB.y / lengthAB
    }
    //计算AC在AB的投影长度
    const projection_length = AC.x * _AB.x + AC.y * _AB.y;
    //计算投影坐标
    const point = {
    x: _AB.x * projection_length + A.x,
    y: _AB.y * projection_length + A.y
    }
    //计算中点到垂点距离
    const centerLength = Math.sqrt(Math.pow(point.x - centerPoint.x, 2) + Math.pow(point.y - centerPoint.y, 2))
    //是否在线段上 (近似判断)
    const flag = Math.round(centerLength * 1000) / 1000 <= Math.round(halfLength * 1000) / 1000
    //计算垂足到线段距离
    if(!flag){
    console.log(centerLength - halfLength);
    }
    //计算垂距
    const length = Math.sqrt(Math.pow(point.x - C.x, 2) + Math.pow(point.y - C.y, 2))
    return {
    flag,
    point,
    length
    }
    },
    /**
     * 时间戳格式化
     * @param {number} timestamp 
     * @returns 
     */
    formatDate(timestamp){
        const date = new Date(timestamp / 1000000);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    
        return formattedDate;
    },
    /**
    * 计算长度 ---- 保留两位小数
    * @param {point} A 
    * @param {point} B 
    * @param {number} num 
    * @returns {number}
    */
    getLengthAB(A,B,num){
    const x = B.x - A.x;
    const y = B.y - A.y
    let length = Math.sqrt(x*x + y*y)
    if(!isNaN(num)){
    const count = Math.pow(10,num)
    length = Math.round(length * count) / count
    }
    return length
    }
   }
   const a = { x: 0, y: 0 }
   const b = { x: 5, y: 0 }
   const c = { x: 5, y: 5 }
   console.log(utilHelps.getAngle(a, b, c)); //45
   console.log(utilHelps.getAngle(a, c, b)); //45
   // console.log(utilHelps.getAngle(b, a, c)); //45
   // console.log(utilHelps.getAngle(c, b, a)); //45
   // console.log(utilHelps.getLineK(a, c)); //1
   // console.log(utilHelps.getLineK(b, c)); //1
   // console.log(utilHelps.getAngle(a, c));
   // console.log(utilHelps.getAngle(a));
   
   // const AB = [5, 5]
   // const AC = [-5, 0]
   // console.log(utilHelps.projectVector(AC, AB))
   // console.log(Math.round(2.499999999 * 100) / 100);
   // console.log(Math.round(2.5));
   // console.log(Math.pow(5 - 1 , 2));
   // console.log(utilHelps.projectFootPoint(a,c,b));
   // console.log(utilHelps.projectFootPoint(a,c,b));
   // console.log(utilHelps.getLengthAB(a,c,-2));