import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Header
    'site.title': 'Triết học Mác-Lênin',
    'hero.title': 'Vật chất và Ý thức',
    'hero.subtitle': 'Quan điểm của Triết học Mác - Lênin',
    'hero.cta': 'Khám phá ngay',
    'nav.intro': 'Giới thiệu',
    'nav.history': 'Lịch sử',
    'nav.marxist': 'Quan điểm',
    'nav.existence': 'Phương thức tồn tại',
    'nav.unity': 'Tính thống nhất',
    'nav.conclusion': 'Kết luận',

    // Sections
    'intro.title': 'Giới thiệu chung',
    'intro.text1': 'Vật chất là phạm trù nền tảng của chủ nghĩa duy vật triết học.',
    'intro.text2': 'Cuộc đấu tranh lịch sử giữa chủ nghĩa duy vật và chủ nghĩa duy tâm xoay quanh vấn đề vật chất.',
    'intro.text3': 'Quan niệm về vật chất của chủ nghĩa duy vật đã phát triển lâu dài cùng khoa học và thực tiễn.',
    'intro.objective': 'Mục tiêu bài thuyết trình: Trình bày quan niệm của triết học Mác - Lênin về vật chất, phương thức tồn tại và tính thống nhất vật chất của thế giới.',

    'history.title': 'Quan niệm trước Mác về Vật chất',
    'history.idealism.title': 'Chủ nghĩa Duy tâm',
    'history.idealism.point1': 'Thừa nhận sự tồn tại của sự vật, hiện tượng nhưng phủ nhận đặc trưng "tự thân tồn tại".',
    'history.idealism.point2': 'Duy tâm khách quan: Cho rằng giới tự nhiên là sự "tha hóa" của "tinh thần thế giới".',
    'history.idealism.point3': 'Duy tâm chủ quan: Cho rằng sự vật tồn tại lệ thuộc vào chủ quan (ý thức).',
    'history.consequences.title': 'Hệ quả nhận thức luận',
    'history.consequences.point1': 'Con người không thể hoặc chỉ nhận thức được cái bóng, bề ngoài.',
    'history.consequences.point2': 'Nhận thức chỉ là quá trình ý thức "tìm lại" chính mình.',
    'history.consequences.point3': 'Phủ nhận tính tồn tại khách quan của vật chất.',

    'marxist.title': 'Quan niệm của Triết học Mác - Lênin về Vật chất',
    'marxist.quote': 'Vật chất là một phạm trù triết học dùng để chỉ thực tại khách quan được đem lại cho con người trong cảm giác, được cảm giác của chúng ta chép lại, chụp lại, phản ánh, và tồn tại không lệ thuộc vào cảm giác.',
    'marxist.core.title': 'Nội dung cốt lõi',
    'marxist.core.point1': 'Vật chất là thực tại khách quan, tồn tại độc lập với ý thức.',
    'marxist.core.point2': 'Vật chất là cái gây nên cảm giác, được phản ánh trong ý thức.',
    'marxist.core.point3': 'Vật chất có trước, ý thức có sau và phụ thuộc vào vật chất.',

    'existence.title': 'Phương thức tồn tại của Vật chất',
    'existence.motion.title': 'Vận động',
    'existence.motion.description': 'Vận động là phương thức tồn tại, thuộc tính cố hữu của vật chất. Bao gồm mọi sự biến đổi nói chung, từ thay đổi vị trí đến tư duy.',
    'existence.motion.point1': 'Thuộc tính cố hữu: Không có vật chất không vận động',
    'existence.motion.point2': 'Tự thân vận động: Nguồn gốc vận động nằm trong mâu thuẫn nội tại',
    'existence.motion.point3': 'Phổ biến và vĩnh viễn: Mọi sự vật đều vận động, không thể tạo ra hay tiêu diệt',
    'existence.spacetime.title': 'Không gian và Thời gian',
    'existence.spacetime.description': 'Là những hình thức tồn tại khách quan của vật chất vận động:',
    'existence.spacetime.point1': 'Không gian: Biểu thị quảng tính, sự cùng tồn tại, trật tự, kết cấu',
    'existence.spacetime.point2': 'Thời gian: Biểu thị độ dài diễn biến, sự kế tiếp của các quá trình',
    'existence.spacetime.point3': 'Tính thống nhất: Không gian và thời gian không tách rời nhau',

    'unity.title': 'Tính Thống nhất Vật chất của Thế giới',
    'unity.description': 'Thế giới thống nhất ở tính vật chất của nó, được biểu hiện qua:',
    'unity.point1': 'Chỉ có một thế giới duy nhất là thế giới vật chất, tồn tại khách quan',
    'unity.point2': 'Mọi bộ phận của thế giới đều là dạng cụ thể của vật chất',
    'unity.point3': 'Thế giới vật chất vĩnh viễn, vô hạn, không do ai sinh ra',
    'unity.evidence.title': 'Bằng chứng',
    'unity.evidence.point1': 'Thực tiễn: Con người cải biến thế giới dựa trên quy luật khách quan',
    'unity.evidence.point2': 'Khoa học tự nhiên: Các phát hiện về cấu tạo vật chất, năng lượng',
    'unity.evidence.point3': 'Khoa học xã hội: Xã hội là cấp độ tổ chức cao của vật chất',

    'conclusion.title': 'Kết luận',
    'conclusion.intro': 'Triết học Mác - Lênin khẳng định:',
    'conclusion.point1': 'Vật chất là thực tại khách quan, tồn tại độc lập và quyết định ý thức',
    'conclusion.point2': 'Vật chất tồn tại thông qua vận động trong không gian và thời gian',
    'conclusion.point3': 'Thế giới thống nhất ở tính vật chất của nó',
    'conclusion.summary': 'Những quan điểm này cung cấp thế giới quan duy vật khoa học và phương pháp luận biện chứng để nhận thức và cải tạo thế giới.',

    // === Missing keys added below ===
    // History - Idealism
    'history.idealism.point1_alt': 'Thừa nhận sự tồn tại khách quan của thế giới vật chất, lấy tự nhiên giải thích tự nhiên',
    'history.idealism.quote.text': '"Tinh thần vô hạn quyết định tồn tại của giới tự nhiên. Tự nhiên do tinh thần sinh ra và phụ thuộc vào tinh thần."',
    'history.idealism.quote.author': '— G.W.F. Hegel',

    // History - Materialism
    'history.materialism.subtitle': 'Chủ nghĩa Duy vật',
    'history.materialism.ancient.alt': 'Chủ nghĩa Duy vật cổ đại',
    'history.materialism.ancient.title': 'Chủ nghĩa Duy vật thời Cổ đại',
    'history.materialism.ancient.description': `Quan niệm chất phác, quy vật chất về một hay một vài dạng cụ thể (nước, lửa, không khí...). Trường hợp đặc biệt: Không, Đạo.
Anaximander: Apeiron - vật chất đơn nhất, vô định, vô hạn.
Lơxip & Đêmôcrít: Thuyết Nguyên tử.`,
    'history.materialism.ancient.period': 'Thế kỷ VI - IV TCN',
    'history.materialism.consistent.alt': 'Quan điểm nhất quán',
    'history.materialism.consistent.title': 'Quan điểm nhất quán',
    'history.materialism.consistent.description': 'Thừa nhận sự tồn tại khách quan của thế giới vật chất, lấy tự nhiên giải thích tự nhiên.',
    'history.materialism.renaissance.alt': 'Chủ nghĩa Duy vật thời Phục Hưng',
    'history.materialism.renaissance.title': 'Chủ nghĩa Duy vật thời Phục Hưng',
    'history.materialism.renaissance.description': `Tiếp nối tư tưởng cổ đại nhưng mang tính phản kháng tôn giáo. Đề cao lý trí, thực nghiệm và khoa học.
Bacon: "Tri thức là sức mạnh".
Galileo: Thực nghiệm, cơ học.
Newton: Cơ học cổ điển – mô hình vũ trụ như cỗ máy.`,
    'history.materialism.renaissance.period': 'Thế kỷ XV - XVII',

    // Marxist View (Cards)
    'marxist.context.alt': 'Bối cảnh',
    'marxist.context.title': 'Bối cảnh',
    'marxist.context.description': 'Tổng kết thành tựu khoa học, đấu tranh chống duy tâm, bảo vệ và phát triển chủ nghĩa duy vật.',
    'marxist.context.point1': 'Phản biện lại các quan điểm duy tâm',
    'marxist.context.point2': 'Tổng kết các thành tựu khoa học tự nhiên',
    'marxist.context.point3': 'Phát triển chủ nghĩa duy vật biện chứng',
    'marxist.method.alt': 'Phương pháp định nghĩa',
    'marxist.method.title': 'Phương pháp định nghĩa',
    'marxist.method.description': 'Đặt vật chất đối lập với ý thức trên phương diện nhận thức luận cơ bản (cái nào có trước).',
    'marxist.method.point2': 'Vật chất quyết định ý thức',
    'marxist.method.point3': 'Ý thức phản ánh vật chất',
    'marxist.definition.alt': 'Định nghĩa kinh điển',
    'marxist.definition.title': 'Định nghĩa kinh điển',
    'marxist.definition.author': '- V.I. Lênin',

    // Marxist Analysis Slideshow
    'marxist.analysis.title': 'Phân tích Định nghĩa Vật chất của Lênin',
    'marxist.analysis.subtitle': 'Nội dung cốt lõi',
    'marxist.analysis.slide1.alt': 'Vật chất là Thực tại khách quan',
    'marxist.analysis.slide1.title': 'Vật chất là Thực tại khách quan',
    'marxist.analysis.slide1.point2': 'Là cái trừu tượng nhưng có cơ sở hiện thực, bao quát mọi sự vật, hiện tượng',
    'marxist.analysis.slide1.point3': 'Tồn tại xã hội cũng khách quan, không phụ thuộc ý thức xã hội',
    'marxist.analysis.slide2.alt': 'Vật chất là cái gây nên cảm giác',
    'marxist.analysis.slide2.title': 'Vật chất là cái gây nên cảm giác',
    'marxist.analysis.slide2.point1': 'Tác động (trực tiếp/gián tiếp) vào giác quan con người',
    'marxist.analysis.slide2.point3': 'Cảm giác/ý thức là cái có sau, phụ thuộc vật chất (tính thứ hai)',
    'marxist.analysis.slide3.alt': 'Vật chất được Ý thức phản ánh',
    'marxist.analysis.slide3.title': 'Vật chất được Ý thức phản ánh',
    'marxist.analysis.slide3.point1': 'Ý thức là sự phản ánh (chép lại, chụp lại, bản sao) của thực tại khách quan',
    'marxist.analysis.slide3.point2': 'Khẳng định khả năng nhận thức thế giới vật chất của con người',
    'marxist.analysis.slide3.point3': 'Chỉ có cái chưa biết, không có cái không thể biết',
    'slideshow.goToSlide': 'Đi đến slide {slideNumber}',
    'slideshow.prev': 'Slide trước',
    'slideshow.next': 'Slide tiếp theo',

    // Methodology
    'methodology.title': 'Ý nghĩa phương pháp luận của Định nghĩa Vật chất',
    'methodology.subtitle': 'Định nghĩa vật chất của Lênin không chỉ có ý nghĩa lý luận mà còn có ý nghĩa phương pháp luận sâu sắc',
    'methodology.alt': 'Ý nghĩa phương pháp luận',
    'methodology.point1.title': 'Giải quyết vấn đề cơ bản của triết học',
    'methodology.point1.description': 'Giải quyết triệt để hai mặt vấn đề cơ bản của triết học trên lập trường duy vật biện chứng.',
    'methodology.point2.title': 'Vũ khí lý luận',
    'methodology.point2.description': 'Vũ khí lý luận chống chủ nghĩa duy tâm, thuyết bất khả tri, chủ nghĩa duy vật siêu hình.',
    'methodology.point3.title': 'Nguyên tắc khách quan',
    'methodology.point3.description': 'Đòi hỏi nguyên tắc khách quan: Xuất phát từ hiện thực khách quan, tôn trọng và vận dụng quy luật khách quan trong nhận thức và thực tiễn.',
    'methodology.point4.title': 'Cơ sở xã hội',
    'methodology.point4.description': 'Cơ sở xác định vật chất trong lĩnh vực xã hội (điều kiện sinh hoạt vật chất, quan hệ vật chất).',
    'methodology.point5.title': 'Nền tảng liên kết',
    'methodology.point5.description': 'Nền tảng liên kết Chủ nghĩa duy vật biện chứng và Chủ nghĩa duy vật lịch sử.',

    // Existence - Motion/Stillness Tabs
    'existence.tabs.nature_features': 'Bản chất & Đặc điểm',
    'existence.tabs.forms_relations': 'Hình thức & Quan hệ',
    'existence.motion.what_is.title': 'Vận động là gì?',
    'existence.motion.what_is.subtitle': 'Theo Ph. Ăngghen',
    'existence.motion.what_is.point2': 'Bao gồm mọi sự biến đổi nói chung (từ thay đổi vị trí đến tư duy).',
    'existence.motion.what_is.point3': 'Không thể tách rời vật chất và vận động.',
    'existence.motion.alt': 'Vận động của vật chất',
    'existence.motion.image_caption': 'Vận động là phương thức tồn tại của vật chất',
    'existence.motion.features.title': 'Đặc điểm của Vận động',
    'existence.motion.features.point1.title': 'Thuộc tính cố hữu',
    'existence.motion.features.point2.title': 'Tự thân vận động',
    'existence.motion.features.point3.title': 'Phổ biến và Vĩnh viễn',
    'existence.motion.features.point4.title': 'Nhận thức',
    'existence.motion.features.point4.description': 'Nhận thức sự vật là nhận thức sự vận động của nó.',
    'existence.motion.quote.text': '"Vận động và đứng im là hai mặt đối lập nhưng thống nhất của một thể thống nhất. Đứng im là tương đối, vận động là tuyệt đối."',
    'existence.motion.quote.author': '— Ph. Ăngghen',
    'existence.stillness.title': 'Vận động và Đứng im',
    'existence.stillness.what_is.title': 'Đứng im là gì?',
    'existence.stillness.what_is.point1': 'Trạng thái ổn định về chất, sự vật còn là nó, chưa biến đổi thành cái khác.',
    'existence.stillness.what_is.point2': 'Là một dạng đặc biệt của vận động (vận động trong cân bằng, ổn định tương đối).',
    'existence.stillness.what_is.point3': 'Tương đối, tạm thời: Chỉ xảy ra trong một quan hệ, một hình thức vận động nhất định, không phải vĩnh viễn.',
    'existence.stillness.relationship.title': 'Mối quan hệ biện chứng',
    'existence.stillness.relationship.point1': 'Vận động là tuyệt đối: Diễn ra không ngừng, ở mọi nơi, mọi lúc.',
    'existence.stillness.relationship.point2': 'Thống nhất biện chứng: Đứng im là điều kiện cho sự vật tồn tại, vận động là điều kiện cho sự vật biến đổi.',
    'existence.stillness.relationship.point3': 'Quan điểm siêu hình: Tách rời, tuyệt đối hóa vận động hoặc đứng im.',

    // Marxist View Simplified
    'marxist.view.alt': 'Quan niệm Mác - Lênin',

    // Existence Simplified
    'existence.alt': 'Phương thức tồn tại',
    'existence.spacetime.point4': 'Tính khách quan, vĩnh cửu, vô tận, có 3 chiều (không gian) và 1 chiều (thời gian)',
    'existence.spacetime.point5': 'Tính thống nhất: Gắn bó với vật chất vận động, không tách rời',

    // Unity Simplified
    'unity.alt': 'Tính thống nhất',
    // Methodology Takeaway Box (New)
    'methodology.takeaway.title': 'Điểm cốt lõi',
    'methodology.takeaway.text': 'Định nghĩa vật chất của Lênin là nền tảng cho thế giới quan duy vật khoa học, nhấn mạnh tính khách quan và khả năng nhận thức thế giới, đồng thời yêu cầu cách tiếp cận biện chứng trong thực tiễn.',
    // Footer (New)
    'footer.rights': 'Đã đăng ký Bản quyền.',
    'footer.backToTop': 'Lên đầu trang',
    // === End of added keys ===
  },
  en: {
    // Header
    'site.title': 'Marxist-Leninist Philosophy',
    'hero.title': 'Matter and Consciousness',
    'hero.subtitle': 'Perspective of Marxist-Leninist Philosophy',
    'hero.cta': 'Explore Now',
    'nav.intro': 'Introduction',
    'nav.history': 'History',
    'nav.marxist': 'Marxist View',
    'nav.existence': 'Mode of Existence',
    'nav.unity': 'Unity',
    'nav.conclusion': 'Conclusion',

    // Sections
    'intro.title': 'General Introduction',
    'intro.text1': 'Matter is the fundamental category of philosophical materialism.',
    'intro.text2': 'The historical struggle between materialism and idealism revolves around the question of matter.',
    'intro.text3': 'The materialist conception of matter has evolved alongside science and practice.',
    'intro.objective': 'Presentation Objective: To present the Marxist-Leninist philosophical perspective on matter, its mode of existence, and the material unity of the world.',

    'history.title': 'Pre-Marxist Conceptions of Matter',
    'history.idealism.title': 'Idealism',
    'history.idealism.point1': 'Acknowledges the existence of things and phenomena but denies their "independent existence".',
    'history.idealism.point2': 'Objective Idealism: Views nature as the "alienation" of the "world spirit".',
    'history.idealism.point3': 'Subjective Idealism: Claims that things exist dependent on consciousness.',
    'history.consequences.title': 'Epistemological Consequences',
    'history.consequences.point1': 'Humans cannot know or can only know shadows, appearances.',
    'history.consequences.point2': 'Cognition is merely consciousness "finding itself".',
    'history.consequences.point3': 'Denies the objective existence of matter.',

    'marxist.title': 'Marxist-Leninist Conception of Matter',
    'marxist.quote': 'Matter is a philosophical category denoting the objective reality given to us in sensation, that is copied, photographed, and reflected by our sensations, while existing independently of them.',
    'marxist.core.title': 'Core Content',
    'marxist.core.point1': 'Matter is objective reality, existing independently of consciousness.',
    'marxist.core.point2': 'Matter causes sensations and is reflected in consciousness.',
    'marxist.core.point3': 'Matter precedes consciousness and determines it.',

    'existence.title': 'Mode of Existence of Matter',
    'existence.motion.title': 'Motion',
    'existence.motion.description': 'Motion is the mode of existence, an inherent attribute of matter. It includes all changes in general, from change in position to thought.',
    'existence.motion.point1': 'Inherent attribute: No matter exists without motion',
    'existence.motion.point2': 'Self-motion: Source of motion lies in internal contradictions',
    'existence.motion.point3': 'Universal and eternal: All things move, cannot be created or destroyed',
    'existence.spacetime.title': 'Space and Time',
    'existence.spacetime.description': 'These are objective forms of existence of moving matter:',
    'existence.spacetime.point1': 'Space: Expresses extension, coexistence, order, structure',
    'existence.spacetime.point2': 'Time: Expresses duration, succession of processes',
    'existence.spacetime.point3': 'Unity: Space and time are inseparable',

    'unity.title': 'Material Unity of the World',
    'unity.description': 'The world is unified in its materiality, manifested through:',
    'unity.point1': 'There is only one world - the material world, existing objectively',
    'unity.point2': 'All parts of the world are concrete forms of matter',
    'unity.point3': 'The material world is eternal, infinite, uncreated',
    'unity.evidence.title': 'Evidence',
    'unity.evidence.point1': 'Practice: Humans transform the world based on objective laws',
    'unity.evidence.point2': 'Natural Sciences: Discoveries about matter structure, energy',
    'unity.evidence.point3': 'Social Sciences: Society is a higher level of material organization',

    'conclusion.title': 'Conclusion',
    'conclusion.intro': 'Marxist-Leninist Philosophy affirms:',
    'conclusion.point1': 'Matter is objective reality, existing independently and determining consciousness',
    'conclusion.point2': 'Matter exists through motion in space and time',
    'conclusion.point3': 'The world is unified in its materiality',
    'conclusion.summary': 'These views provide a scientific materialist worldview and dialectical methodology for understanding and transforming the world.',

    'history.idealism.point1_alt': 'Acknowledges the existence of things and phenomena but denies their "independent existence"',
    'history.idealism.quote.text': '"The infinite spirit determines..."',
    'history.idealism.quote.author': '— G.W.F. Hegel',

    'history.materialism.subtitle': 'Materialism',
    'history.materialism.ancient.alt': 'Ancient Materialism',
    'history.materialism.ancient.title': 'Ancient Materialism',
    'history.materialism.ancient.description': `Naive conception, reducing matter to one or a few specific forms (water, fire, air...). Special cases: Void, Dao.
Anaximander: Apeiron - single, indefinite, infinite matter.
Leucippus & Democritus: Atomic Theory.`,
    'history.materialism.ancient.period': '6th - 4th Century BC',
    'history.materialism.consistent.alt': 'Consistent Viewpoint',
    'history.materialism.consistent.title': 'Consistent Viewpoint',
    'history.materialism.consistent.description': 'Acknowledged the objective existence of the material world, explaining nature through nature.',
    'history.materialism.renaissance.alt': 'Renaissance Materialism',
    'history.materialism.renaissance.title': 'Renaissance Materialism',
    'history.materialism.renaissance.description': `Continued ancient ideas but with resistance to religion. Emphasized reason, empiricism, and science.
Bacon: "Knowledge is power".
Galileo: Experimentation, mechanics.
Newton: Classical mechanics – universe as a machine model.`,
    'history.materialism.renaissance.period': '15th - 17th Century',

    'marxist.context.alt': 'Context',
    'marxist.context.title': 'Context',
    'marxist.context.description': 'Summarizing scientific achievements...',
    'marxist.context.point1': 'Refuting idealist views',
    'marxist.context.point2': 'Summarizing natural science achievements',
    'marxist.context.point3': 'Developing dialectical materialism',
    'marxist.method.alt': 'Method of Definition',
    'marxist.method.title': 'Method of Definition',
    'marxist.method.description': 'Contrasting matter with consciousness...',
    'marxist.method.point2': 'Matter determines consciousness',
    'marxist.method.point3': 'Consciousness reflects matter',
    'marxist.definition.alt': 'Classical Definition',
    'marxist.definition.title': 'Classical Definition',
    'marxist.definition.author': '- V.I. Lenin',

    'marxist.analysis.title': 'Analysis of Lenin\'s Definition of Matter',
    'marxist.analysis.subtitle': 'Core Content',
    'marxist.analysis.slide1.alt': 'Matter is Objective Reality',
    'marxist.analysis.slide1.title': 'Matter is Objective Reality',
    'marxist.analysis.slide1.point2': 'Abstract but with a real basis...',
    'marxist.analysis.slide1.point3': 'Social existence is also objective...',
    'marxist.analysis.slide2.alt': 'Matter Causes Sensation',
    'marxist.analysis.slide2.title': 'Matter Causes Sensation',
    'marxist.analysis.slide2.point1': 'Affects human senses (directly/indirectly)',
    'marxist.analysis.slide2.point3': 'Sensation/consciousness comes after...',
    'marxist.analysis.slide3.alt': 'Matter is Reflected by Consciousness',
    'marxist.analysis.slide3.title': 'Matter is Reflected by Consciousness',
    'marxist.analysis.slide3.point1': 'Consciousness is the reflection (copy)...',
    'marxist.analysis.slide3.point2': 'Affirms the possibility of knowing the material world',
    'marxist.analysis.slide3.point3': 'Only the unknown exists, not the unknowable',
    'slideshow.goToSlide': 'Go to slide {slideNumber}',
    'slideshow.prev': 'Previous slide',
    'slideshow.next': 'Next slide',

    'methodology.title': 'Methodological Significance of the Definition of Matter',
    'methodology.subtitle': 'Lenin\'s definition... has profound methodological significance',
    'methodology.alt': 'Methodological Significance',
    'methodology.point1.title': 'Resolves the Fundamental Question of Philosophy',
    'methodology.point1.description': 'Thoroughly resolves both aspects...',
    'methodology.point2.title': 'Theoretical Weapon',
    'methodology.point2.description': 'Theoretical weapon against idealism...',
    'methodology.point3.title': 'Principle of Objectivity',
    'methodology.point3.description': 'Demands the principle of objectivity...',
    'methodology.point4.title': 'Social Basis',
    'methodology.point4.description': 'Basis for identifying matter in the social sphere...',
    'methodology.point5.title': 'Linking Foundation',
    'methodology.point5.description': 'Foundation linking Dialectical and Historical Materialism',

    'existence.tabs.nature_features': 'Nature & Features',
    'existence.tabs.forms_relations': 'Forms & Relations',
    'existence.motion.what_is.title': 'What is Motion?',
    'existence.motion.what_is.subtitle': 'According to F. Engels',
    'existence.motion.what_is.point2': 'Includes all changes in general...',
    'existence.motion.what_is.point3': 'Matter and motion are inseparable',
    'existence.motion.alt': 'Motion of Matter',
    'existence.motion.image_caption': 'Motion is the mode of existence of matter',
    'existence.motion.features.title': 'Features of Motion',
    'existence.motion.features.point1.title': 'Inherent Attribute',
    'existence.motion.features.point2.title': 'Self-Motion',
    'existence.motion.features.point3.title': 'Universal and Eternal',
    'existence.motion.features.point4.title': 'Cognition',
    'existence.motion.features.point4.description': 'Knowing a thing is knowing its motion',
    'existence.motion.quote.text': '"Motion and rest are two opposing but unified..."',
    'existence.motion.quote.author': '— F. Engels',
    'existence.stillness.title': 'Motion and Stillness',
    'existence.stillness.what_is.title': 'What is Stillness?',
    'existence.stillness.what_is.point1': 'State of qualitative stability...',
    'existence.stillness.what_is.point2': 'Is a special form of motion...',
    'existence.stillness.what_is.point3': 'Relative, temporary...',
    'existence.stillness.relationship.title': 'Dialectical Relationship',
    'existence.stillness.relationship.point1': 'Motion is absolute...',
    'existence.stillness.relationship.point2': 'Dialectical unity...',
    'existence.stillness.relationship.point3': 'Metaphysical view: Separates...',

    'marxist.view.alt': 'Marxist-Leninist View',

    'existence.alt': 'Mode of Existence',
    'existence.spacetime.point4': 'Objective, eternal, infinite, 3 dimensions (space) & 1 dimension (time)',
    'existence.spacetime.point5': 'Unity: Bound to moving matter, inseparable',

    'unity.alt': 'Unity',
    // Methodology Takeaway Box (New)
    'methodology.takeaway.title': 'Core Takeaway',
    'methodology.takeaway.text': 'Lenin\'s definition of matter is the foundation for a scientific materialist worldview, emphasizing objectivity and the possibility of knowing the world, while demanding a dialectical approach in practice.',
    // Footer (New)
    'footer.rights': 'All Rights Reserved.',
    'footer.backToTop': 'Back to Top',
  }
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 