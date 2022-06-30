module.exports = function(sequelize, DataTypes){
    //테이블 이름을 정의
    return sequelize.define('items',{
        //데이터베이스 테이블에는 반드시 유니크한 값이 하나 존재해야합니다.
        //테이블에 데이터가 하나씩 늘어날때마다 알아서 자동적으로 생성되는 값을 맨 처음에 이렇게 둡니다.
        idx:{
            type : DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        //컬럼 값을 정의합니다.
        shoeName:{
            type:DataTypes.TEXT
        },
        launchDate:{
            type:DataTypes.STRING(250)
        },
        Draw:{
            type:DataTypes.TEXT
        },
        shoeImg:{
            type:DataTypes.TEXT
        }
    })
}


