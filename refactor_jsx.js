import fs from 'fs';
import path from 'path';

const srcDir = path.join('d:', 'WorkSpace', 'WebbanHang', 'my-brand-admin', 'src', 'pages', 'Handbook');

function replaceInFile(fileName, replacements) {
  const filePath = path.join(srcDir, fileName);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes("useTranslation()")) {
    content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport { useTranslation } from 'react-i18next';");
    content = content.replace("export default function", "export default function");
    
    // Insert useTranslation hook
    const funcMatch = content.match(/export default function (\w+)\(\) \{/);
    if (funcMatch) {
      content = content.replace(funcMatch[0], `${funcMatch[0]}\n    const { t } = useTranslation();`);
    }
  }

  for (const [key, value] of Object.entries(replacements)) {
    // Escape regex special chars in value
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`>\\s*${escapedValue}\\s*<`, 'g');
    content = content.replace(regex, `>{t('${key}')}<`);
    
    const regex2 = new RegExp(`"${escapedValue}"`, 'g');
    content = content.replace(regex2, `t('${key}')`);
    
    const regex3 = new RegExp(`'${escapedValue}'`, 'g');
    content = content.replace(regex3, `t('${key}')`);
  }
  
  // Custom manual replacements for specific cases where spacing or quotes differ
  if (fileName === 'CulinaryGuidePage.jsx') {
    content = content.replace(/Trở về Cẩm nang/g, "{t('hbBack')}");
    content = content.replace(/The King's Harvest/g, "{t('hbKing')}");
    content = content.replace(/Ẩm Thực &amp; Chế Biến/g, "{t('culTag')}");
    content = content.replace(/Ẩm Thực & Chế Biến/g, "{t('culTag')}");
    content = content.replace(/5 Món Ngon Chế Biến Từ Sầu Riêng Bạn Phải Thử/g, "{t('culTitle')}");
    content = content.replace(/Từ món tráng miệng thanh lịch đến bữa sáng dân dã được nâng tầm — nghệ thuật ẩm thực từ Vua Của Các Loại Trái Cây./g, "{t('culDesc')}");
    content = content.replace(/Bởi Chuyên gia Út Thoa/g, "{t('culAuthor')}");
    content = content.replace(/20 Tháng 5, 2024/g, "{t('culDate')}");
    content = content.replace(/7 phút đọc/g, "{t('culReadTime')}");
    content = content.replace(/Sầu riêng không chỉ để thưởng thức nguyên múi\. Với kết cấu béo ngậy và hương thơm đặc trưng không thể nhầm lẫn, sầu riêng là nguyên liệu đặc biệt có thể biến hóa thành vô vàn món ngon từ tráng miệng sang chảnh đến bữa sáng quen thuộc — tất cả đều được nâng lên tầm đẳng cấp mới\./g, "{t('culIntro')}");
    
    content = content.replace(/Bánh Ngọt/g, "{t('dish1Tag')}");
    content = content.replace(/Bánh Crepe Sầu Riêng Kem Tươi/g, "{t('dish1Title')}");
    content = content.replace(/Lớp crepe mỏng mịn, mềm mại ôm trọn nhân kem tươi whipping béo ngậy và cơm sầu riêng chín vàng ươm. Cắn một miếng — hương sầu riêng lan tỏa ngay lập tức, kết cấu tan chảy đúng kiểu Pháp — Việt hòa quyện tuyệt vời\./g, "{t('dish1Desc')}");
    content = content.replace(/Dùng bột mì số 8 để lớp crepe mỏng và dai hơn\. Cho nhân vào khi bánh đã nguội hoàn toàn để tránh nhân bị chảy\./g, "{t('dish1Tip')}");
    
    content = content.replace(/Thức Uống/g, "{t('dish2Tag')}");
    content = content.replace(/Chè Sầu Riêng Thập Cẩm/g, "{t('dish2Title')}");
    content = content.replace(/Kết hợp cơm sầu riêng tươi với nước cốt dừa béo ngậy, đậu xanh bùi và thạch dừa giòn sần. Hương vị đậm đà, ngọt dịu — món giải nhiệt hoàng gia cho những ngày oi bức\./g, "{t('dish2Desc')}");
    content = content.replace(/Làm lạnh cơm sầu riêng 30 phút trước khi chế biến để hương vị đậm đà và kết cấu chắc hơn\./g, "{t('dish2Tip')}");
    
    content = content.replace(/Kem &amp; Tráng Miệng/g, "{t('dish3Tag')}");
    content = content.replace(/Kem & Tráng Miệng/g, "{t('dish3Tag')}");
    content = content.replace(/Kem Sầu Riêng Mát Lạnh/g, "{t('dish3Title')}");
    content = content.replace(/Chỉ cần 3 nguyên liệu: cơm sầu riêng, sữa đặc và kem tươi đánh bông\. Kết cấu mượt mà như gelato Ý, hương sầu riêng thuần khiết không pha lẫn — đặc sản tự làm đỉnh cao\./g, "{t('dish3Desc')}");
    content = content.replace(/Cấp đông ít nhất 6 tiếng\. Lấy ra 5 phút trước khi ăn để kem mềm lại vừa độ\./g, "{t('dish3Tip')}");
    
    content = content.replace(/Món Mặn/g, "{t('dish4Tag')}");
    content = content.replace(/Xôi Sầu Riêng Nước Cốt Dừa/g, "{t('dish4Title')}");
    content = content.replace(/Gạo nếp dẻo thơm nấu cùng nước cốt dừa, phủ lên lớp cơm sầu riêng vàng ươm béo ngậy\. Là món ăn sáng truyền thống được nâng tầm thành trải nghiệm ẩm thực xa xỉ\./g, "{t('dish4Desc')}");
    content = content.replace(/Ngâm gạo nếp qua đêm và thêm một nhúm muối vào nước cốt dừa để tăng vị đậm đà\./g, "{t('dish4Tip')}");
    
    content = content.replace(/"Bánh"/g, "t('dish5Tag')");
    content = content.replace(/>\s*Bánh\s*</g, ">{t('dish5Tag')}<");
    content = content.replace(/Bánh Mousse Sầu Riêng/g, "{t('dish5Title')}");
    content = content.replace(/Lớp đế cookie giòn xốp, mousse sầu riêng nhẹ như mây mà đậm hương, phủ lớp gương sầu riêng ánh vàng bóng mịn. Kiệt tác pastry xứng tầm với hàng dessert boutique\./g, "{t('dish5Desc')}");
    content = content.replace(/Làm gelatin theo đúng tỉ lệ 1:5 với nước lạnh, nở đủ 5 phút trước khi đun chảy nhẹ\./g, "{t('dish5Tip')}");
    
    content = content.replace(/Mẹo của Chuyên gia/g, "{t('proTip')}");
    content = content.replace(/Nguyên Liệu Chất Lượng/g, "{t('ctaMatLabel')}");
    content = content.replace(/Bắt đầu với sầu riêng tươi chất lượng cao nhất/g, "{t('ctaMatTitle')}");
    content = content.replace(/Mọi công thức đều trở nên hoàn hảo khi bạn chọn đúng nguyên liệu\. Sầu riêng Ri6, Musang King, Black Thorn tươi cắt sẵn — giao tận nơi\./g, "{t('ctaMatDesc')}");
    content = content.replace(/Chọn Nguyên Liệu Tươi/g, "{t('ctaMatBtn')}");
    content = content.replace(/Khám Phá Thêm/g, "{t('exploreMore')}");
    content = content.replace(/Bài Viết Liên Quan/g, "{t('relatedArticles')}");
    content = content.replace(/Cách bảo quản sầu riêng tươi ngon suốt nhiều ngày/g, "{t('presTitle')}");
    content = content.replace(/Bảo Quản/g, "{t('presTag')}");
    content = content.replace(/Lợi ích sức khỏe bất ngờ từ Vua Của Các Loại Trái Cây/g, "{t('nutriTitle')}");
    content = content.replace(/Dinh Dưỡng/g, "{t('nutriTag')}");
    
    content = content.replace(/alt=\{dish\.title\}/g, 'alt={t(dish.title)}');
    content = content.replace(/\{dish\.tag\}/g, '{t(dish.tag)}');
    content = content.replace(/\{dish\.title\}/g, '{t(dish.title)}');
    content = content.replace(/\{dish\.desc\}/g, '{t(dish.desc)}');
    content = content.replace(/\{dish\.tip\}/g, '{t(dish.tip)}');
    
    // In dishes array
    content = content.replace(/tag: "Bánh Ngọt"/g, 'tag: "dish1Tag"');
    content = content.replace(/title: "Bánh Crepe Sầu Riêng Kem Tươi"/g, 'title: "dish1Title"');
    content = content.replace(/desc: "Lớp crepe mỏng mịn, mềm mại ôm trọn nhân kem tươi whipping béo ngậy và cơm sầu riêng chín vàng ươm. Cắn một miếng — hương sầu riêng lan tỏa ngay lập tức, kết cấu tan chảy đúng kiểu Pháp — Việt hòa quyện tuyệt vời."/g, 'desc: "dish1Desc"');
    content = content.replace(/tip: "Dùng bột mì số 8 để lớp crepe mỏng và dai hơn. Cho nhân vào khi bánh đã nguội hoàn toàn để tránh nhân bị chảy."/g, 'tip: "dish1Tip"');

    content = content.replace(/tag: "Thức Uống"/g, 'tag: "dish2Tag"');
    content = content.replace(/title: "Chè Sầu Riêng Thập Cẩm"/g, 'title: "dish2Title"');
    content = content.replace(/desc: "Kết hợp cơm sầu riêng tươi với nước cốt dừa béo ngậy, đậu xanh bùi và thạch dừa giòn sần. Hương vị đậm đà, ngọt dịu — món giải nhiệt hoàng gia cho những ngày oi bức."/g, 'desc: "dish2Desc"');
    content = content.replace(/tip: "Làm lạnh cơm sầu riêng 30 phút trước khi chế biến để hương vị đậm đà và kết cấu chắc hơn."/g, 'tip: "dish2Tip"');

    content = content.replace(/tag: "Kem & Tráng Miệng"/g, 'tag: "dish3Tag"');
    content = content.replace(/title: "Kem Sầu Riêng Mát Lạnh"/g, 'title: "dish3Title"');
    content = content.replace(/desc: "Chỉ cần 3 nguyên liệu: cơm sầu riêng, sữa đặc và kem tươi đánh bông. Kết cấu mượt mà như gelato Ý, hương sầu riêng thuần khiết không pha lẫn — đặc sản tự làm đỉnh cao."/g, 'desc: "dish3Desc"');
    content = content.replace(/tip: "Cấp đông ít nhất 6 tiếng. Lấy ra 5 phút trước khi ăn để kem mềm lại vừa độ."/g, 'tip: "dish3Tip"');

    content = content.replace(/tag: "Món Mặn"/g, 'tag: "dish4Tag"');
    content = content.replace(/title: "Xôi Sầu Riêng Nước Cốt Dừa"/g, 'title: "dish4Title"');
    content = content.replace(/desc: "Gạo nếp dẻo thơm nấu cùng nước cốt dừa, phủ lên lớp cơm sầu riêng vàng ươm béo ngậy. Là món ăn sáng truyền thống được nâng tầm thành trải nghiệm ẩm thực xa xỉ."/g, 'desc: "dish4Desc"');
    content = content.replace(/tip: "Ngâm gạo nếp qua đêm và thêm một nhúm muối vào nước cốt dừa để tăng vị đậm đà."/g, 'tip: "dish4Tip"');

    content = content.replace(/tag: "Bánh"/g, 'tag: "dish5Tag"');
    content = content.replace(/title: "Bánh Mousse Sầu Riêng"/g, 'title: "dish5Title"');
    content = content.replace(/desc: "Lớp đế cookie giòn xốp, mousse sầu riêng nhẹ như mây mà đậm hương, phủ lớp gương sầu riêng ánh vàng bóng mịn. Kiệt tác pastry xứng tầm với hàng dessert boutique."/g, 'desc: "dish5Desc"');
    content = content.replace(/tip: "Làm gelatin theo đúng tỉ lệ 1:5 với nước lạnh, nở đủ 5 phút trước khi đun chảy nhẹ."/g, 'tip: "dish5Tip"');
  }
  
  else if (fileName === 'NutritionGuidePage.jsx') {
    content = content.replace(/Trở về Cẩm nang/g, "{t('hbBack')}");
    content = content.replace(/The King's Harvest/g, "{t('hbKing')}");
    content = content.replace(/Dinh Dưỡng &amp; Sức Khỏe/g, "{t('nutriTag')}");
    content = content.replace(/Dinh Dưỡng & Sức Khỏe/g, "{t('nutriTag')}");
    content = content.replace(/Lợi ích sức khỏe bất ngờ từ Vua Của Các Loại Trái Cây/g, "{t('nutriTitle')}");
    content = content.replace(/Khám phá nguồn năng lượng và khoáng chất dồi dào trong mỗi múi sầu riêng\. Không chỉ là tuyệt tác ẩm thực, sầu riêng còn là một viên ngọc quý của thiên nhiên dành cho sức khỏe\./g, "{t('nutriDesc')}");
    content = content.replace(/Hồ Sơ Dinh Dưỡng Thượng Hạng/g, "{t('nutriSec1Title')}");
    content = content.replace(/Mỗi khẩu phần sầu riêng \(khoảng 243g\) cung cấp một ma trận phức tạp các dưỡng chất thiết yếu, vượt trội so với hầu hết các loại trái cây nhiệt đới khác\./g, "{t('nutriSec1Desc')}");
    content = content.replace(/Giá trị hàng ngày \(DV\)\. Chống oxy hóa mạnh mẽ, hỗ trợ hệ miễn dịch và tái tạo collagen\./g, "{t('vitCDesc')}");
    content = content.replace(/Kali \(Potassium\)/g, "{t('potassiumTitle')}");
    content = content.replace(/Điều hòa huyết áp, cân bằng điện giải và hỗ trợ chức năng cơ bắp khỏe mạnh\./g, "{t('potassiumDesc')}");
    content = content.replace(/>Chất Xơ</g, ">{t('fiberTitle')}<");
    content = content.replace(/Hỗ trợ tiêu hóa xuất sắc, duy trì cảm giác no lâu và cân bằng hệ vi sinh đường ruột\./g, "{t('fiberDesc')}");
    content = content.replace(/Nguồn năng lượng sạch, dồi dào từ carbohydrate phức hợp và chất béo thực vật lành mạnh\./g, "{t('caloriesDesc')}");
    content = content.replace(/01 \/ Năng Lượng/g, "{t('energyLabel')}");
    content = content.replace(/Nguồn Năng Lượng Tức Thì &amp; Bền Vững/g, "{t('energyTitle')}");
    content = content.replace(/Nguồn Năng Lượng Tức Thì & Bền Vững/g, "{t('energyTitle')}");
    content = content.replace(/Sầu riêng chứa hàm lượng carbohydrate cao, cung cấp năng lượng nhanh chóng cho cơ thể\. Tuy nhiên, sự kết hợp với chất béo thực vật và chất xơ giúp quá trình giải phóng năng lượng diễn ra từ từ, không gây tăng đường huyết đột ngột, lý tưởng cho việc phục hồi sau khi vận động mạnh\./g, "{t('energyDesc')}");
    content = content.replace(/02 \/ Tinh Thần/g, "{t('moodLabel')}");
    content = content.replace(/Liều Thuốc Tự Nhiên Cho Cảm Xúc/g, "{t('moodTitle')}");
    content = content.replace(/Hương vị đậm đà không chỉ thỏa mãn vị giác\. Sầu riêng giàu Tryptophan - một loại axit amin thiết yếu mà cơ thể chuyển hóa thành Serotonin và Melatonin\. Quá trình này giúp giảm căng thẳng, cải thiện tâm trạng và mang lại giấc ngủ sâu, thư thái\./g, "{t('moodDesc')}");
    content = content.replace(/"Một khẩu phần sầu riêng có thể hỗ trợ đáng kể trong việc điều hòa chu kỳ giấc ngủ tự nhiên\."/g, "{t('moodQuote')}");
    content = content.replace(/Hệ Tiêu Hóa Khỏe Mạnh/g, "{t('digestionTitle')}");
    content = content.replace(/Lượng chất xơ hòa tan dồi dào trong sầu riêng hoạt động như một prebiotics tự nhiên, nuôi dưỡng vi khuẩn có lợi trong đường ruột, hỗ trợ quá trình tiêu hóa trơn tru và ngăn ngừa các vấn đề về dạ dày\./g, "{t('digestionDesc')}");
    content = content.replace(/Bảo Vệ Tim Mạch/g, "{t('heartTitle')}");
    content = content.replace(/Giàu kali và chất béo không bão hòa đơn lành mạnh, sầu riêng giúp kiểm soát huyết áp, giảm mức cholesterol xấu \(LDL\), từ đó giảm thiểu rủi ro mắc các bệnh về tim mạch khi thưởng thức điều độ\./g, "{t('heartDesc')}");
    content = content.replace(/Bài Viết Liên Quan/g, "{t('relatedArticles')}");
    content = content.replace(/Bí Quyết Chọn Lựa/g, "{t('selTag')}");
    content = content.replace(/Cách chọn sầu riêng chín ngon qua âm thanh và mùi hương/g, "{t('selTitle')}");
    content = content.replace(/Bảo Quản/g, "{t('presTag')}");
    content = content.replace(/Cách bảo quản sầu riêng tươi ngon suốt nhiều ngày/g, "{t('presTitle')}");
    content = content.replace(/Ẩm Thực/g, "{t('culTag')}");
    content = content.replace(/5 Món Ngon Chế Biến Từ Sầu Riêng Bạn Phải Thử/g, "{t('culTitle')}");
    
    content = content.replace(/\{item\.tag\}/g, '{t(item.tag)}');
    content = content.replace(/\{item\.title\}/g, '{t(item.title)}');
    
    content = content.replace(/tag: "Bí Quyết Chọn Lựa"/g, 'tag: "selTag"');
    content = content.replace(/title: "Cách chọn sầu riêng chín ngon qua âm thanh và mùi hương"/g, 'title: "selTitle"');
    content = content.replace(/tag: "Bảo Quản"/g, 'tag: "presTag"');
    content = content.replace(/title: "Cách bảo quản sầu riêng tươi ngon suốt nhiều ngày"/g, 'title: "presTitle"');
    content = content.replace(/tag: "Ẩm Thực"/g, 'tag: "culTag"');
    content = content.replace(/title: "5 Món Ngon Chế Biến Từ Sầu Riêng Bạn Phải Thử"/g, 'title: "culTitle"');
  }

  else if (fileName === 'PreservationGuidePage.jsx') {
    content = content.replace(/Trở về Cẩm nang/g, "{t('hbBack')}");
    content = content.replace(/The King's Harvest/g, "{t('hbKing')}");
    content = content.replace(/Culinary Guide • Preservation/g, "{t('presTag')}");
    content = content.replace(/Cách bảo quản sầu riêng tươi ngon suốt nhiều ngày/g, "{t('presTitle')}");
    content = content.replace(/Bởi Chuyên gia Út Thoa/g, "{t('culAuthor')}");
    content = content.replace(/15 Tháng 5, 2024/g, "{t('presDate')}");
    content = content.replace(/5 phút đọc/g, "{t('presReadTime')}");
    content = content.replace(/Sầu riêng, "vị vua của các loại trái cây", luôn mang đến một trải nghiệm ẩm thực xa xỉ nhờ hương vị nồng nàn và chất cơm vàng óng, béo ngậy\. Tuy nhiên, để giữ trọn vẹn sự hoàn mỹ này sau khi tách vỏ là một nghệ thuật đòi hỏi sự tinh tế\./g, "{t('presIntro')}");
    content = content.replace(/1\. Nguyên tắc cốt lõi: Kiểm soát nhiệt độ &amp; Độ ẩm/g, "{t('presSec1Title')}");
    content = content.replace(/1\. Nguyên tắc cốt lõi: Kiểm soát nhiệt độ & Độ ẩm/g, "{t('presSec1Title')}");
    content = content.replace(/Ngay sau khi khui, múi sầu riêng bắt đầu quá trình oxy hóa tự nhiên khi tiếp xúc với không khí\. Để làm chậm quá trình này, môi trường lưu trữ phải mô phỏng lại sự mát mẻ và khô ráo hoàn hảo\./g, "{t('presSec1Desc')}");
    content = content.replace(/Nhiệt độ vàng/g, "{t('tempGolden')}");
    content = content.replace(/Ngăn mát tủ lạnh: <strong>4°C đến 8°C<\/strong> \(Bảo quản ngắn ngày: 2-3 ngày\)\./g, "Ngăn mát tủ lạnh: <strong>4°C đến 8°C</strong> {t('tempCool').split(':')[1] || ''}");
    content = content.replace(/Ngăn mát tủ lạnh: 4°C đến 8°C \(Bảo quản ngắn ngày: 2-3 ngày\)\./g, "{t('tempCool')}");
    content = content.replace(/Ngăn đông: <strong>-18°C<\/strong> \(Bảo quản dài ngày: Lên đến 3 tháng\)\./g, "Ngăn đông: <strong>-18°C</strong> {t('tempFreeze').split(':')[1] || ''}");
    content = content.replace(/Ngăn đông: -18°C \(Bảo quản dài ngày: Lên đến 3 tháng\)\./g, "{t('tempFreeze')}");
    content = content.replace(/2\. Lựa chọn "Lớp Áo Giáp" hoàn hảo/g, "{t('presSec2Title')}");
    content = content.replace(/Hương thơm đặc trưng của sầu riêng có thể dễ dàng ám mùi sang các thực phẩm khác và ngược lại\. Do đó, việc lựa chọn vật dụng chứa đựng quyết định trực tiếp đến chất lượng múi sầu\./g, "{t('presSec2Desc')}");
    content = content.replace(/<strong>Hộp thủy tinh có nắp ron cao su:<\/strong> Lựa chọn tối ưu nhất\. Thủy tinh không bám mùi, ron cao su tạo môi trường kín khí tuyệt đối\./g, "{t('boxGlass')}");
    content = content.replace(/<strong>Hộp nhựa cao cấp \(BPA-free\):<\/strong> Nhẹ và tiện dụng, nhưng cần đảm bảo nắp khóa 4 cạnh chắc chắn\./g, "{t('boxPlastic')}");
    content = content.replace(/<strong>Màng bọc thực phẩm kép:<\/strong> Nếu dùng đĩa, hãy bọc ít nhất 2-3 lớp màng bọc PE chất lượng cao, ép sát vào bề mặt cơm sầu để hạn chế không khí\./g, "{t('wrapPE')}");
    content = content.replace(/3\. Kỹ thuật cấp đông nghệ thuật/g, "{t('presSec3Title')}");
    content = content.replace(/Đối với những tín đồ muốn lưu giữ hương vị xuyên mùa, cấp đông là giải pháp lý tưởng\. Tuy nhiên, cấp đông sai cách sẽ làm vỡ kết cấu tế bào, khiến cơm sầu bị nhão khi rã đông\./g, "{t('presSec3Desc')}");
    content = content.replace(/<strong>Tách hạt \(tùy chọn\):<\/strong> Tách hạt cẩn thận để tiết kiệm không gian và dễ sử dụng sau này\./g, "{t('freezeStep1')}");
    content = content.replace(/<strong>Bọc kín từng múi:<\/strong> Bọc riêng biệt từng múi bằng màng bọc thực phẩm trước khi cho vào hộp kín\. Điều này ngăn chặn tình trạng đông đá bề mặt \(freezer burn\)\./g, "{t('freezeStep2')}");
    content = content.replace(/<strong>Rã đông chậm:<\/strong> Khi sử dụng, hãy chuyển từ ngăn đông xuống ngăn mát khoảng 4-6 tiếng\. Tuyệt đối không rã đông bằng lò vi sóng hay nước nóng\. Cơm sầu rã đông đúng cách sẽ mang lại kết cấu mượt mà như kem lạnh \(gelato\)\./g, "{t('freezeStep3')}");
    content = content.replace(/Chia sẻ bài viết này:/g, "{t('shareArticle')}");
    content = content.replace(/Trải nghiệm sầu riêng tươi cắt sẵn/g, "{t('sidebarTitle')}");
    content = content.replace(/Được tuyển chọn kỹ lưỡng, tách vỏ thủ công và đóng gói hút chân không chuyên dụng, giữ trọn hương vị tuyệt hảo giao đến tận tay bạn\./g, "{t('sidebarDesc')}");
    content = content.replace(/Đặt Mua Ngay/g, "{t('sidebarBtn')}");
    content = content.replace(/Bài Viết Liên Quan/g, "{t('relatedArticles')}");
    content = content.replace(/Cách chọn sầu riêng chín ngon qua âm thanh và mùi hương/g, "{t('selTitle')}");
    content = content.replace(/5 Món Ngon Chế Biến Từ Sầu Riêng Bạn Phải Thử/g, "{t('culTitle')}");
    content = content.replace(/10 Tháng 5, 2024/g, "{t('selDate')}");
    content = content.replace(/02 Tháng 5, 2024/g, "{t('culDate')}");
    // specific replacements since they use inline strings
    content = content.replace(/>Ngăn mát tủ lạnh: <strong>4°C đến 8°C<\/strong> \(Bảo quản ngắn ngày: 2-3 ngày\)\./g, ">{t('tempCool')}");
    content = content.replace(/>Ngăn đông: <strong>-18°C<\/strong> \(Bảo quản dài ngày: Lên đến 3 tháng\)\./g, ">{t('tempFreeze')}");
    content = content.replace(/<span><strong>Hộp thủy tinh có nắp ron cao su:<\/strong> Lựa chọn tối ưu nhất\. Thủy tinh không bám mùi, ron cao su tạo môi trường kín khí tuyệt đối\.<\/span>/g, "<span>{t('boxGlass')}</span>");
    content = content.replace(/<span><strong>Hộp nhựa cao cấp \(BPA-free\):<\/strong> Nhẹ và tiện dụng, nhưng cần đảm bảo nắp khóa 4 cạnh chắc chắn\.<\/span>/g, "<span>{t('boxPlastic')}</span>");
    content = content.replace(/<span><strong>Màng bọc thực phẩm kép:<\/strong> Nếu dùng đĩa, hãy bọc ít nhất 2-3 lớp màng bọc PE chất lượng cao, ép sát vào bề mặt cơm sầu để hạn chế không khí\.<\/span>/g, "<span>{t('wrapPE')}</span>");
    content = content.replace(/<li><strong>Tách hạt \(tùy chọn\):<\/strong> Tách hạt cẩn thận để tiết kiệm không gian và dễ sử dụng sau này\.<\/li>/g, "<li>{t('freezeStep1')}</li>");
    content = content.replace(/<li><strong>Bọc kín từng múi:<\/strong> Bọc riêng biệt từng múi bằng màng bọc thực phẩm trước khi cho vào hộp kín\. Điều này ngăn chặn tình trạng đông đá bề mặt \(freezer burn\)\.<\/li>/g, "<li>{t('freezeStep2')}</li>");
    content = content.replace(/<li><strong>Rã đông chậm:<\/strong> Khi sử dụng, hãy chuyển từ ngăn đông xuống ngăn mát khoảng 4-6 tiếng\. Tuyệt đối không rã đông bằng lò vi sóng hay nước nóng\. Cơm sầu rã đông đúng cách sẽ mang lại kết cấu mượt mà như kem lạnh \(gelato\)\.<\/li>/g, "<li>{t('freezeStep3')}</li>");
  }

  else if (fileName === 'SelectionGuidePage.jsx') {
    content = content.replace(/Trở về Cẩm nang/g, "{t('hbBack')}");
    content = content.replace(/The King's Harvest/g, "{t('hbKing')}");
    content = content.replace(/Bí Quyết Chọn Lựa/g, "{t('selTag')}");
    content = content.replace(/Cách chọn sầu riêng chín ngon qua âm thanh và mùi hương/g, "{t('selTitle')}");
    content = content.replace(/Lắng nghe tiếng gõ và nhận biết hương thơm là hai kỹ năng quan trọng nhất để chọn được trái sầu riêng hoàn hảo\./g, "{t('selDesc')}");
    content = content.replace(/Bởi Chuyên gia Út Thoa/g, "{t('culAuthor')}");
    content = content.replace(/10 Tháng 5, 2024/g, "{t('selDate')}");
    content = content.replace(/6 phút đọc/g, "{t('selReadTime')}");
    content = content.replace(/Chọn được một trái sầu riêng ngon là một nghệ thuật được truyền từ đời này sang đời khác — kết hợp giữa kinh nghiệm thực tiễn, các giác quan được rèn luyện và hiểu biết sâu về sinh học của loại trái cây đặc biệt này\./g, "{t('selIntro1')}");
    content = content.replace(/Không cần thiết phải là chuyên gia, chỉ cần nắm vững 4 nguyên tắc vàng dưới đây, bạn sẽ luôn mang về nhà những múi sầu riêng vàng ươm, béo ngậy, thơm lừng đúng như mong đợi\./g, "{t('selIntro2')}");
    content = content.replace(/"Âm thanh"/g, "t('soundLabel')");
    content = content.replace(/"Trầm & Rỗng"/g, "t('soundVal')");
    content = content.replace(/"Mùi hương"/g, "t('smellLabel')");
    content = content.replace(/"Ngọt & Béo"/g, "t('smellVal')");
    content = content.replace(/"Ngoại hình"/g, "t('lookLabel')");
    content = content.replace(/"Gai Cứng & Cuống To"/g, "t('lookVal')");
    content = content.replace(/"Trọng lượng"/g, "t('weightLabel')");
    content = content.replace(/"Nặng Tay"/g, "t('weightVal')");

    content = content.replace(/title: "Nghệ Thuật Lắng Nghe"/g, 'title: "tip1Title"');
    content = content.replace(/subtitle: "Kỹ năng gõ & nghe tiếng"/g, 'subtitle: "tip1Sub"');
    content = content.replace(/desc: "Dùng khớp ngón tay gõ nhẹ lên thân trái sầu riêng theo từng ô gai. Một trái chín hoàn hảo sẽ phát ra âm thanh trầm, rỗng, vang — như tiếng gõ vào thùng gỗ rỗng. Tránh xa những trái phát tiếng đặc, bịch hay quá chắc."/g, 'desc: "tip1Desc"');
    content = content.replace(/"Gõ nhẹ ở nhiều vị trí khác nhau trên thân trái"/g, 't("tip1S1")');
    content = content.replace(/"Âm thanh trầm, rỗng = cơm đã tách khỏi vỏ = chín tới"/g, 't("tip1S2")');
    content = content.replace(/"Âm thanh đặc, chắc = còn sống hoặc bị ép chín"/g, 't("tip1S3")');
    content = content.replace(/"Âm thanh quá rỗng & nhẹ = có thể đã quá chín"/g, 't("tip1S4")');
    
    content = content.replace(/title: "Đọc Vị Mùi Hương"/g, 'title: "tip2Title"');
    content = content.replace(/subtitle: "Ngửi cuống & kẽ gai"/g, 'subtitle: "tip2Sub"');
    content = content.replace(/desc: "Hương thơm là ngôn ngữ thật sự của sầu riêng. Đưa mũi vào gần cuống trái và các kẽ giữa gai — một trái đang ở đỉnh chín sẽ tỏa ra mùi thơm ngọt ngào, béo ngậy, ấm áp. Không cần mùi nồng nặc mới là ngon."/g, 'desc: "tip2Desc"');
    content = content.replace(/"Ngửi trực tiếp tại cuống — nơi hương thơm thoát ra đầu tiên"/g, 't("tip2S1")');
    content = content.replace(/"Mùi thơm ngọt nhẹ, béo = chín đúng tầm, ăn ngay"/g, 't("tip2S2")');
    content = content.replace(/"Mùi nồng, cồn, hắc = đã lên men, quá chín"/g, 't("tip2S3")');
    content = content.replace(/"Không mùi hoặc mùi lá = còn non, chưa ăn được"/g, 't("tip2S4")');
    
    content = content.replace(/title: "Quan Sát Ngoại Hình"/g, 'title: "tip3Title"');
    content = content.replace(/subtitle: "Gai, cuống & màu sắc"/g, 'subtitle: "tip3Sub"');
    content = content.replace(/desc: "Mắt tinh tường là công cụ chọn lựa đầu tiên. Một trái sầu riêng chất lượng cao có vỏ dày đều, gai cứng và nhọn, cuống to tròn chắc khỏe — đây là dấu hiệu cây mẹ khỏe mạnh và trái được nuôi dưỡng đầy đủ."/g, 'desc: "tip3Desc"');
    content = content.replace(/"Cuống to, tròn, chắc = trái được nuôi dưỡng tốt"/g, 't("tip3S1")');
    content = content.replace(/"Gai cứng, đầu nhọn đều = vỏ còn tươi, chưa héo"/g, 't("tip3S2")');
    content = content.replace(/"Màu vàng xanh đều, không đốm đen = vỏ khỏe mạnh"/g, 't("tip3S3")');
    content = content.replace(/"Tránh trái có vết nứt, ố vàng bất thường hoặc mốc"/g, 't("tip3S4")');
    
    content = content.replace(/title: "Cảm Nhận Trọng Lượng"/g, 'title: "tip4Title"');
    content = content.replace(/subtitle: "Nặng tay = nhiều cơm"/g, 'subtitle: "tip4Sub"');
    content = content.replace(/desc: "Cầm trái lên và cảm nhận. Một trái tốt phải nặng tay so với kích thước của nó — đây là dấu hiệu các múi cơm bên trong đầy đặn, dày và mọng. Trái nhẹ hơn kỳ vọng thường có ít múi hoặc cơm bị lép."/g, 'desc: "tip4Desc"');
    content = content.replace(/"So sánh các trái cùng cỡ — chọn trái nặng hơn"/g, 't("tip4S1")');
    content = content.replace(/"Nặng \+ âm rỗng = kết hợp hoàn hảo, cơm đầy & chín tới"/g, 't("tip4S2")');
    content = content.replace(/"Nhẹ \+ âm rỗng = ít múi, khoảng trống lớn trong trái"/g, 't("tip4S3")');
    content = content.replace(/"Nặng \+ âm đặc = còn sống, cần chờ thêm vài ngày"/g, 't("tip4S4")');
    
    content = content.replace(/Nhận biết chi tiết/g, "{t('detailLabel')}");
    content = content.replace(/"Người mua sầu riêng giỏi không cần nhìn vào bên trong\. Họ đọc được tất cả qua âm thanh, mùi hương và cảm giác trên tay — như đọc một cuốn sách đã thuộc lòng\."/g, "{t('quoteText')}");
    content = content.replace(/— Chuyên gia Út Thoa, 20 năm kinh nghiệm/g, "{t('quoteAuthor')}");
    content = content.replace(/>Cẩn Thận</g, ">{t('mistakeLabel')}<");
    content = content.replace(/Những Sai Lầm Phổ Biến Cần Tránh/g, "{t('mistakeTitle')}");
    
    content = content.replace(/title: "Tin vào màu sắc vỏ"/g, 'title: "mis1Title"');
    content = content.replace(/desc: "Màu vàng đậm không đồng nghĩa với chín ngon. Nhiều người bán hàng dùng hóa chất để làm vàng vỏ — hãy dùng mũi và tai làm trọng tài."/g, 'desc: "mis1Desc"');
    content = content.replace(/title: "Ép chín bằng cách ủ"/g, 'title: "mis2Title"');
    content = content.replace(/desc: "Ủ sầu riêng xanh trong bao tải kín sẽ cho cơm chín nhưng hương vị nhạt nhẽo, kết cấu nhão. Không thể thay thế quá trình chín tự nhiên trên cây."/g, 'desc: "mis2Desc"');
    content = content.replace(/title: "Mua khi trái đã nứt sẵn"/g, 'title: "mis3Title"');
    content = content.replace(/desc: "Trái đã nứt vỏ trước khi bán thường do bị ép chín, quá chín hoặc bảo quản không đúng. Chỉ mua khi bạn tự tách — đó là đảm bảo an toàn nhất."/g, 'desc: "mis3Desc"');
    
    content = content.replace(/Không cần lo lắng nữa/g, "{t('ctaLabel')}");
    content = content.replace(/Đã chọn được — giờ chỉ cần thưởng thức/g, "{t('ctaTitle')}");
    content = content.replace(/Nếu bạn vẫn chưa đủ tự tin, hãy để chúng tôi lo phần chọn lựa\. Mỗi trái sầu riêng tại The King's Harvest đều đã qua kiểm định bởi chuyên gia\./g, "{t('ctaDesc')}");
    content = content.replace(/Mua Sầu Riêng Ngay/g, "{t('ctaBtn')}");
    
    content = content.replace(/Bài Viết Liên Quan/g, "{t('relatedArticles')}");
    content = content.replace(/Bảo Quản/g, "{t('presTag')}");
    content = content.replace(/Cách bảo quản sầu riêng tươi ngon suốt nhiều ngày/g, "{t('presTitle')}");
    content = content.replace(/Dinh Dưỡng/g, "{t('nutriTag')}");
    content = content.replace(/Lợi ích sức khỏe bất ngờ từ Vua Của Các Loại Trái Cây/g, "{t('nutriTitle')}");
    content = content.replace(/Ẩm Thực/g, "{t('culTag')}");
    content = content.replace(/5 Món Ngon Chế Biến Từ Sầu Riêng Bạn Phải Thử/g, "{t('culTitle')}");
    
    content = content.replace(/\{item\.tag\}/g, '{t(item.tag)}');
    content = content.replace(/\{item\.title\}/g, '{t(item.title)}');
    content = content.replace(/\{item\.desc\}/g, '{t(item.desc)}');
    
    content = content.replace(/\{tip\.title\}/g, '{t(tip.title)}');
    content = content.replace(/\{tip\.subtitle\}/g, '{t(tip.subtitle)}');
    content = content.replace(/\{tip\.desc\}/g, '{t(tip.desc)}');
    
    content = content.replace(/tag: "Bảo Quản"/g, 'tag: "presTag"');
    content = content.replace(/title: "Cách bảo quản sầu riêng tươi ngon suốt nhiều ngày"/g, 'title: "presTitle"');
    content = content.replace(/tag: "Dinh Dưỡng"/g, 'tag: "nutriTag"');
    content = content.replace(/title: "Lợi ích sức khỏe bất ngờ từ Vua Của Các Loại Trái Cây"/g, 'title: "nutriTitle"');
    content = content.replace(/tag: "Ẩm Thực"/g, 'tag: "culTag"');
    content = content.replace(/title: "5 Món Ngon Chế Biến Từ Sầu Riêng Bạn Phải Thử"/g, 'title: "culTitle"');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}

replaceInFile('CulinaryGuidePage.jsx', {});
replaceInFile('NutritionGuidePage.jsx', {});
replaceInFile('PreservationGuidePage.jsx', {});
replaceInFile('SelectionGuidePage.jsx', {});

console.log('JSX files updated successfully!');
