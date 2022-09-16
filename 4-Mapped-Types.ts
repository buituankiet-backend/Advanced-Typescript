type Properties = 'PropA' | 'PropB';
type MyMappedType< T> = {
    // [P in Properties]: boolean | number | P // return MyMappedType: boolean \ number | { 'PropA', 'PropB'}
    [P in keyof T]: T[P];
}

type MyNewType = MyMappedType<{a : "A", b: "B"}> //Mapped thuong duoc tao ra der su dung cho mot obj