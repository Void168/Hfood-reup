import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'Le Phu Hung',
            email:'phuhung16820@gmail.com',
            avatar:'/image/Avatar/sfsff.png',
            password: bcrypt.hashSync('hung12345', 8),
            isAdmin: true,
        },
    ],
    products: [
        {
            name: 'Thịt heo nạc',
            image:'/image/Meat/Pork/thit-heo.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt heo',
            price: 150000,
            discount: 10,
            rating: 5,
            numReview: 10,
            description: 'Thịt vai heo G được đóng gói và bảo quản đạt các tiêu chuẩn về an toàn toàn thực phẩm. Tỉ lệ nạc mỡ hoàn hảo đảm bảo được độ ngon thịt, các món ăn như thịt luộc, thịt kho hoặc thịt xào với các loại rau, củ. Có thể dùng điện thoại quét mã QR trên tem sản phẩm để kiểm tra nguồn gốc.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Thịt bò bít tết',
            image: '/image/Meat/Beef/bit-tet.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt bò',
            price: 280000,
            discount: 10,
            rating: 5,
            numReview: 15,
            description: 'Bít tết bò được lấy từ phần thăn phía ngoài của xương sống được cắt từ phần thắt lưng đến phần hông, bên ngoài có một lớp mỡ mỏng bao phía bên ngoài giúp gia tăng hương vị đáng kể của miếng thịt bò. Thịt bò Pacow luôn cam kết thành phần là thịt bò mát 100% thiên nhiên, nguồn gốc rõ ràng đảm bảo an toàn vệ sinh thực phẩm, chất lượng cao, đạt chuẩn từ trang trại tới bàn ăn.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Súp lơ xanh',
            image: '/image/Vegetable/Rau/suplo.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 8000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Bông cải xanh hoặc súp lơ xanh là một loại cây thuộc họ cải, có hoa lớn ở đầu, thường được dùng như rau. Bông cải xanh thường được chế biến bằng cách luộc hoặc hấp, nhưng cũng có thể được ăn sống như là rau sống trong những đĩa đồ nguội khai vị. Có rất nhiều món ăn được chế biến từ bông cải xanh chẳng hạn như pasta với bông cải xanh, súp bông cải xanh, bông cải xanh xào tô. Ngoài ra bông cải xanh được dùng để làm các món salad, xào thịt, xào hải sản, giúp món ăn hạ bớt lượng nhiệt từ dầu mỡ, thịt, đảm bảo hài hòa, cân bằng cho bữa ăn',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Rau cải thìa',
            image: '/image/Vegetable/Rau/caithia.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 45000,
            discount: 0,
            rating: 4.7,
            numReview: 15,
            description: 'Cải thìa không chỉ là loại rau quen thuộc để chế biến nên những món ăn ngon mà còn chứa nhiều thành phần dinh dưỡng có lợi cho sức khỏe. Cải thìa tốt cho phụ nữ mang thai, có tác dụng phòng ngừa khuyết tật cho thai nhi, giúp xương chắc khỏe, có khả năng kích thích nhịp tim hoạt động tốt và hạ huyết áp. Cải thìa làm chậm quá trình lão hóa và giảm đáng kể việc hình thành các gốc tự do, có tác dụng phòng ngừa bệnh đục nhân mắt và thoái hóa hoàng điểm ở mắt đồng thời có tác dụng ngăn ngừa ung thư bằng cách loại bỏ những thành phần có hại trong cơ thể.',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Cánh gà',
            image: '/image/Meat/Chicken/canh-ga.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt gà',
            price: 90000,
            discount: 5,
            rating: 5,
            numReview: 15,
            description: 'Cánh gà tươi ngon mọng nước ai cũng ghiền là đây. Cánh được pha lóc từ những con gà thịt đạt chuẩn, trọng lượng đều nhau. Một kí khoảng 9-10 cái cánh gà tùy trọng lượng từng cánh. Qua quá trình giết mổ khép kín, đóng gói và bảo quản bằng công nghệ tiên tiến đạt chuẩn ISO:22000, Gà Tươi 3F được giao đến khách hàng luôn trong tình trạng tươi ngon và an toàn vệ sinh thực phẩm. ',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Rau cải cúc',
            image: '/image/Vegetable/Rau/caicuc.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 266000,
            discount: 10,
            rating: 4.8,
            numReview: 15,
            description: 'Cải cúc (cúc tần ô) là loại rau quen thuộc với người Việt. Không chỉ được dùng để nấu canh mà loại rau này còn được tận dụng để giải cảm, điều trị huyết áp cao, ăn uống không do tỳ vị hư và đau đầu kinh niên.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Cà rốt',
            image: '/image/Vegetable/cuqua/carot.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Củ quả',
            price: 45000,
            discount: 0,
            rating: 4.7,
            numReview: 15,
            description: 'Cà rốt là một loại cây có củ, thường có màu vàng cam, đỏ, vàng, trắng hay tía. Phần ăn được của cà rốt là củ, thực chất là rễ cái của nó, chứa nhiều tiền tố của vitamin A tốt cho mắt.',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Khoai tây',
            image: '/image/Vegetable/cuqua/khoaitay.jpg',
            category: 'Rau củ',
            expiry: '14 ngày kể từ ngày sản xuất',
            type: 'Củ quả',
            price: 50000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Khoai tây có chứa các vitamin, khoáng chất và một loạt các hóa chất thực vật như các carotenoit và phenol tự nhiên. Axít chlorogenic cấu thành đến 90% của phenol trong khoai tây. Các hợp chất khác trong khoai tây là axit 4-O-caffeoylquinic (axit crypto-clorogenic), axit 5-O-caffeoylquinic (axit neo-clorogenic), axit 3,4-dicaffeoylquinic và 3,5-dicaffeoylquinic.[33] Trong một củ khoai tây còn vỏ có kích thước trung bình 150 g, cung cấp 27 mg vitamin C (45% giá trị hàng ngày), 620 mg kali (18%), o,2 mg vitamin B6(10%) và một lượng rất nhỏ thiamin, riboflavin, folate, niacin, magie, photpho, sắt và kẽm.',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Mướp đắng',
            image: '/image/Vegetable/cuqua/muopdang.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Củ quả',
            price: 47000,
            discount: 0,
            rating: 4.5,
            numReview: 15,
            description: 'Mướp đắng giúp kiện tỳ khai vị (kích thích chức năng tiêu hóa); Alkaloid trong mướp đắng có công hiệu lợi niệu hoạt huyết (lợi tiểu, máu lưu thông); tiêu viêm thoái nhiệt (chống viêm, hạ sốt); thanh tâm minh mục (mát tim sáng mắt).',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Rau muống',
            image: '/image/Vegetable/Rau/rau-muong.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 36000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Rau muống có tác dụng giảm cholesterol: Rau muống là một loại thực phẩm để những ai đang muốn giảm cân và giảm nồng độ cholesterol trong máu lựa chọn đúng đắn. Từ đó giảm gây xơ vữa động mạch, nhồi máu cơ tim, đột quỵ...',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Củ cải trắng',
            image: '/image/Vegetable/Cuqua/cucaitrang.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Củ quả',
            price: 30000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Về lợi ích, củ cải trắng có khả năng làm giảm mức cholesterol huyết thanh và nồng độ chất béo trung tính, trong khi làm tăng HDL cholesterol (cholesterol tốt). Chất cay nhẹ trong củ cải trắng giúp kháng khuẩn, giảm đau. Giúp hỗ trợ gan và ngăn ngừa bệnh tim mạch vì chứa hoạt chất sinh học betaine. Chất này hỗ trợ gan hoạt động tốt hơn, đồng thời làm giảm lượng homocysteine huyết tương - một trong những tác nhân gây bệnh tim mạch.',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Rau dền',
            image: '/image/Vegetable/Rau/rauden.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 52000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Không chỉ là loại rau ngon và quen thuộc của mỗi gia đình, rau cải thảo còn tác dụng hạ khí, thanh nhiệt, chứa nhiều vitamin A, B, C, E. Cải thảo nấu chín chứa nhiều vitamin A, C, K, B2, B6, calcium, sắt, mangan, folat, cũng như nhiều thành phần hoạt chất có ảnh hưởng tốt đối với sức khỏe.',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Thịt bắp bò',
            image: '/image/Meat/Beef/bap-bo.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt bò',
            price: 260000,
            discount: 5,
            rating: 4.8,
            numReview: 15,
            description: 'Bắp bò là một phần của cơ bắp cần phải có được bò sử dụng để nâng trọng lượng của cả thân. Vì vậy, bắp bò chứa ít chất béo và thường nặng hơn so với các phần khác của con bò. Cùng đó, bắp bò có rất nhiều gân. Sự kết hợp của thịt nạc và gân làm cho thịt mềm mà không có chút mỡ nào. Thịt bắp bò rất thích hợp để chế biến các món như xào (thái lát), Hấp, món hầm và om.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Cà chua',
            image: '/image/Vegetable/cuqua/cachua.jpg',
            category: 'Rau củ',
            type: 'Củ quả',
            expiry: '7 ngày kể từ ngày sản xuất',
            price: 56000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Cà chua có công dụng làm đẹp như: chống lão hóa, làm da mịn màng tươi sáng, bảo vệ bề mặt da .... Ngoài ra cà chua còn phòng chống ung thư, chữa viêm gan mãn tính, hỗ trợ cho người bị viêm thận, chữa bệnh tim mach, chữa bí đại tiện, thiếu máu, chữa mún nhọt, bõng lửa, chữa sốt cao kèm theo khát nước hay chữa tăng huyết áp, chảy máu chân răng...',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Thịt cốt lết',
            image: '/image/Meat/Pork/cotlet.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt heo',
            price: 110000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Đây là phần thịt lưng của con heo, chủ yếu là nạc và đôi khi cũng được người bán gọi là thịt thăn. Thịt cốt lết thường được cắt kèm với phần đầu xương sườn nên mọi người hay gọi là sườn cốt lết.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Thịt thăn bò',
            image: '/image/Meat/Beef/than-bo.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt bò',
            price: 350000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Thịt thăn bò hữu cơ là phần thịt ngon nhất của thịt bò hiện nay, mỗi phần thịt thăn này rất dễ chế biến thành những món ăn thơm ngon khác nhau, chính vì thế đây là sự lựa chọn được nhiều khách hàng ưu tiên nhất. Cửa hàng thực phẩm của chúng tôi hiện nhập rất nhiều loại thịt thơm ngon cho bạn lựa chọn, thịt có nguồn gốc rõ ràng và an toàn nhất cho mọi đối tượng sử dụng, chính vì thế thịt bò hữu cơ sẽ mang đến nhiều chất dinh dưỡng hoàn hảo nhất cho những người bạn yêu thương trong cuộc sống hiện nay.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Sườn bò',
            image: '/image/Meat/Beef/suon-bo.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt bò',
            price: 310000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Sườn bò Úc có sươn sẽ là một sự lựa chọn hợp lý cho những bữa tiệc dã ngoại, những bữa tiệc nướng hấp dẫn. Sườn bò Úc mang lại hương vị thơm sữa, chắc thịt. Ngoài ra sườn bò Úc còn rất thích hợp cho món hầm. Đây sẽ là một món bổ dưỡng cho bữa ăn của gia đình bạn.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Rau cải thảo',
            image: '/image/Vegetable/Rau/caithao.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 40000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Cải thảo và rau họ nhà cải nói chung được các chuyên gia dinh dưỡng đưa vào nhóm thực phẩm có khả năng kìm hãm quá trình lão hóa. Đó là nhờ lượng chất xơ, khoáng chất như phosphor, kali, canxi, sắt… có nhiều trong loại rau này. Cải thảo cũng giàu các vitamin A, B, C, E rất tốt cho quá trình chống ôxy hóa và duy trì sự trẻ trung',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Móng giò',
            image: '/image/Meat/Pork/monggio.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt heo',
            price: 270000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Móng giò là khúc thịt được tính từ khớp gối đến phần móng lợn. Móng giò có nhiều da và nhiều gân, ít thịt nhưng thịt rất sệt, da giòn. Thịt mỡ ở móng giò khi ăn không quá béo. Móng giò khi hầm, kho, hấp hay nấu đông…đều có mùi vị thơm ngon và có nhiều lợi ích rất tốt cho sức khỏe.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Rau mồng tơi',
            image: '/image/Vegetable/Rau/mongtoi.jpg',
            category: 'Rau củ',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Rau',
            price: 42000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Bông cải xanh hoặc súp lơ xanhlà một loại cây thuộc họ cải, có hoa lớn ở đầu, thường được dùng như rau. Bông cải xanh thường được chế biến bằng cách luộc hoặc hấp, nhưng cũng có thể được ăn sống như là rau sống trong những đĩa đồ nguội khai vị. Có rất nhiều món ăn được chế biến từ bông cải xanh chẳng hạn như pasta với bông cải xanh, súp bông cải xanh, bông cải xanh xào tô Ta có bông cải xanh trộn dầu hào, một món ăn giàu đạm và rất ngon hay gà xào bông cải xanh món ăn âm dương kết hợp hài hò Ngoài ra bông cải xanh được dùng để làm các món salad, xào thịt, xào hải sản, giúp món ăn hạ bớt lượng nhiệt từ dầu mỡ, thịt, đảm bảo hài hòa, cân bằng cho bữa ăn',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Đùi gà',
            image: '/image/Meat/Chicken/duiga.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt gà',
            price: 75000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Đùi gà tươi ngon mọng nước ai cũng ghiền là đây. Đùi được pha lóc từ những con gà thịt đạt chuẩn, trọng lượng đều nhau. Hai kí khoảng 15-16 cái đùi gà tùy trọng lượng từng đùi. Qua quá trình giết mổ khép kín, đóng gói và bảo quản bằng công nghệ tiên tiến đạt chuẩn ISO:22000, Gà Tươi 3F được giao đến khách hàng luôn trong tình trạng tươi ngon và an toàn vệ sinh thực phẩm. ',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Ức gà',
            image: '/image/Meat/Chicken/ucga.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt gà',
            price: 90000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Ức gà được xác định là phần thịt màu trắng nằm phía trước và xung quanh ngực của con gà, thường có rất nhiều thịt, ít da và ít mỡ. Ức gà là một loại thực phẩm giàu chất dinh dưỡng, chúng rất dễ tìm mua và chế biến thành nhiều món ăn hấp dẫn. Ức gà có chứa hàm lượng chất dinh dưỡng cao trong khi chất béo thấp, vì vậy rất phù hợp với khẩu phần ăn dặm của bé, khẩu phần dành cho người muốn giảm cân hay những người bị mỡ trong máu cao.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Thịt ba chỉ heo',
            image: '/image/Meat/Pork/baroi.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt heo',
            price: 215000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Ba chỉ heo rút sườn là phần thịt ngon nhất của heo, với phần vân thịt mà mỡ trải dàn đều làm cho món ăn rất hấp dẫn và chế biến rất nhiều món ngon hấp dẫn như hấp cuốn bánh tráng rau rừng, ba chỉ quay giòn bì, thịt ba chỉ kho tàu..',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Thịt ba chỉ bò',
            image: '/image/Meat/Beef/baroi.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt bò',
            price: 230000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Thịt bò ba chỉ Mỹ chỉ mới rộ lên vài năm gần đây nhưng đã trở thành thực phẩm được rất người yêu thích, đặc biệt là trẻ nhỏ. Thớ thịt vừa có nạc vửa có mỡ mà mỡ là mỡ giòn nên nó thú vị hơn miếng thịt bò toàn nạc khá là nhiều. Thịt bò ba chỉ Mỹ phù hợp để nướng hoặc ăn kèm với các loại lẩu như lẩu thái chua cay, lẩu riêu cua, lẩu thập cẩm...Khoái khẩu.vn phục vụ bạn loại thịt bò ba chỉ như dưới đây:',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Sườn heo',
            image: '/image/Meat/Pork/suonheo.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt heo',
            price: 370000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Sườn lợn hay sườn heo là phần dẻ sườn của con lợn, được lóc từ phần xương sườn của con lợn và có dắt thịt ở trên đó. Đây là một trong những phần thịt từ khúc thịt lợn. Đây là nguyên liệu phổ biến trong ẩm thực các nước châu Á và ẩm thực phương Tây.',
            countInStock: 2000,
            import: '16/08/2021'
        },
        {
            name: 'Sườn cừu',
            image: '/image/Meat/Lamb/suon-cuu.jpg',
            category: 'Thịt',
            expiry: '5 ngày kể từ ngày sản xuất',
            type: 'Thịt cừu',
            discount: 0,
            price: 450000,
            rating: 4.8,
            numReview: 15,
            description: 'Phần thịt sườn cừu thường dùng để chế biến món sườn cừu nướng là chính. Có thể nướng nguyên tảng hoặc nướng từng cây sườn. Với một lớp mỡ mỏng rồi đến một lớp thịt sau đó đến cây sườn. Khi nướng chín và ăn cho ta cảm giác béo béo và thơm hương vị đặc trưng của thịt cừu',
            countInStock: 1000,
            import: '16/08/2021'
        },
        {
            name: 'Cua thịt Cà Mau',
            image: '/image/Seafood/Cua/cuathitcamau.jpg',
            category: 'Hải sản',
            expiry: '3 ngày kể từ ngày sản xuất',
            type: 'Cua',
            price: 580000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: 'Cua thịt là cua đực có yếm hình tam giác. Giá cua thịt cũng thấp hơn so với cua gạch. Với những thực khách thích thưởng thức vị ngon ngọt của thịt cua, cua đực sẽ là lựa chọn số 1 của họ. Đặc cua đực chính gốc từ Cà Mau được nhiều người ưa chuộng nhất. Đặc biệt, cua thịt từ Cà Mau sống tự nhiên nên thịt cua chắc, ngọt. Càng cua là phần ngon và rất hấp dẫn đối với người người và được nhiều trẻ nhỏ thích ăn.',
            countInStock: 500,
            import: '16/08/2021'
        },
        {
            name: 'Phi lê cá hồi',
            image:'/image/Seafood/Fish/ca_hoi_phi_le.jpg',
            category: 'Hải sản',
            expiry: '7 ngày kể từ ngày sản xuất',
            type: 'Cá',
            price: 330000,
            discount: 0,
            rating: 4.8,
            numReview: 15,
            description: ' Cá hồi phi lê là một loại thực phẩm phổ biến và bổ dưỡng. Thịt cá hồi vừa ngon, vừa không sợ béo, các loại axit béo omega-3 chứa trong cá hồi mang lại nhiều lợi ích cho sức khỏe như: chống các dấu hiệu lão hóa, giảm mức cholesterol và huyết áp, kéo giảm nguy cơ bị đột quỵ, giúp giảm đau và cứng khớp gây ra bởi viêm khớp.',
            countInStock: 2000,
            import: '16/08/2021'
        },
    ],
    categories: [
        {
            name:'Thịt',
            image:'/image/icon/meat.png'
        },
        {
            name:'Cá',
            image:'/image/icon/fish.png'
        },
        {
            name:'Rau củ',
            image:'/image/icon/harvest.png'
        },
        {
            name:'Trứng',
            image:'/image/icon/egg.png'
        },
        {
            name:'Trái cây',
            image:'/image/icon/fruits.png'
        },
        {
            name:'Gia vị',
            image:'/image/icon/spice.png'
        },
        {
            name:'Hạt',
            image:'/image/icon/icons8-nut-100.png'
        },
        {
            name:'Làm bánh',
            image:'/image/icon/icons8-bread-loaf-48.png'
        },
        {
            name:'Sữa',
            image:'/image/icon/milk.png'
        },
        {
            name:'Nấm',
            image:'/image/icon/mushroom.png'
        },
        {
            name:'Hải sản',
            image:'/image/icon/shrimp.png'
        },
        {
            name:'Đồ khô',
            image:'/image/icon/dry.png'
        },
        {
            name:'Đồ uống',
            image:'/image/icon/soft-drink.png'
        },
        {
            name:'Đồ hộp',
            image:'/image/icon/can.png'
        },
        {
            name:'Fast Food',
            image:'/image/icon/fast-food.png'
        },
        {
            name:'Nhập khẩu',
            image:'/image/icon/icons8-globe-48.png'
        },
    ],
    vouchers: [
        {
            code: 'HFOOD50',
            content: 'Giảm giá 50k đơn hàng',
            pic: '/image/Avatar/sfsff.png',
            expiry: Date.now()
        },
        {
            code: 'HFFSHIP',
            content: 'Miễn phí giao hàng',
            pic: '/image/Avatar/sfsff.png',
            expiry: Date.now()
        },
        {
            code: 'HF10P',
            content: 'Giảm giá 10% đơn hàng',
            pic: '/image/Avatar/sfsff.png',
            expiry: Date.now()
        },
        {
            code: 'HFVEGET20',
            content: 'Giảm giá 20% mặt hàng rau củ',
            pic: '/image/Avatar/sfsff.png',
            expiry: Date.now()
        }
    ],
}

export default data;