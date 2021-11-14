import {
  AddLocation,
  Aim,
  AlarmClock,
  Apple,
  ArrowDown,
  ArrowDownBold,
  ArrowLeft,
  ArrowLeftBold,
  ArrowRight,
  ArrowRightBold,
  ArrowUp,
  ArrowUpBold,
  Avatar,
  Back,
  Baseball,
  Basketball,
  Bell,
  BellFilled,
  Bicycle,
  Bottom,
  BottomLeft,
  BottomRight,
  Bowl,
  Box,
  Briefcase,
  Brush,
  BrushFilled,
  Burger,
  Calendar,
  Camera,
  CameraFilled,
  CaretBottom,
  CaretLeft,
  CaretRight,
  CaretTop,
  Cellphone,
  ChatDotRound,
  ChatDotSquare,
  ChatLineRound,
  ChatLineSquare,
  ChatRound,
  ChatSquare,
  Check,
  Checked,
  Cherry,
  Chicken,
  CircleCheck,
  CircleCheckFilled,
  CircleClose,
  CircleCloseFilled,
  CirclePlus,
  CirclePlusFilled,
  Clock,
  Close,
  CloseBold,
  Cloudy,
  Coffee,
  CoffeeCup,
  Coin,
  ColdDrink,
  Collection,
  CollectionTag,
  Comment,
  Compass,
  Connection,
  Coordinate,
  CopyDocument,
  Cpu,
  CreditCard,
  Crop,
  DArrowLeft,
  DArrowRight,
  DataAnalysis,
  DataBoard,
  DataLine,
  DCaret,
  Delete,
  DeleteFilled,
  DeleteLocation,
  Dessert,
  Discount,
  Dish,
  DishDot,
  Document,
  DocumentAdd,
  DocumentChecked,
  DocumentCopy,
  DocumentDelete,
  DocumentRemove,
  Download,
  Drizzling,
  Edit,
  Eleme,
  ElemeFilled,
  Expand,
  Failed,
  Female,
  Files,
  Film,
  Filter,
  Finished,
  FirstAidKit,
  Flag,
  Fold,
  Folder,
  FolderAdd,
  FolderChecked,
  FolderDelete,
  FolderOpened,
  FolderRemove,
  Food,
  Football,
  ForkSpoon,
  Fries,
  FullScreen,
  Goblet,
  GobletFull,
  GobletSquare,
  GobletSquareFull,
  Goods,
  GoodsFilled,
  Grape,
  Grid,
  Guide,
  Headset,
  Help,
  HelpFilled,
  Histogram,
  HomeFilled,
  HotWater,
  House,
  IceCream,
  IceCreamRound,
  IceCreamSquare,
  IceDrink,
  IceTea,
  InfoFilled,
  Iphone,
  Key,
  KnifeFork,
  Lightning,
  Link,
  List,
  Loading,
  Location,
  LocationFilled,
  LocationInformation,
  Lock,
  Lollipop,
  MagicStick,
  Magnet,
  Male,
  Management,
  MapLocation,
  Medal,
  Menu,
  Message,
  MessageBox,
  Mic,
  Microphone,
  MilkTea,
  Minus,
  Money,
  Monitor,
  Moon,
  MoonNight,
  More,
  MoreFilled,
  MostlyCloudy,
  Mouse,
  Mug,
  Mute,
  MuteNotification,
  NoSmoking,
  Notebook,
  Notification,
  Odometer,
  OfficeBuilding,
  Open,
  Operation,
  Opportunity,
  Orange,
  Paperclip,
  PartlyCloudy,
  Pear,
  Phone,
  PhoneFilled,
  Picture,
  PictureFilled,
  PictureRounded,
  PieChart,
  Place,
  Platform,
  Plus,
  Pointer,
  Position,
  Postcard,
  Pouring,
  Present,
  PriceTag,
  Printer,
  Promotion,
  QuestionFilled,
  Rank,
  Reading,
  ReadingLamp,
  Refresh,
  RefreshLeft,
  RefreshRight,
  Refrigerator,
  Remove,
  RemoveFilled,
  Right,
  ScaleToOriginal,
  School,
  Scissor,
  Search,
  Select,
  Sell,
  SemiSelect,
  Service,
  Setting,
  SetUp,
  Share,
  Ship,
  Shop,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartFull,
  Smoking,
  Soccer,
  SoldOut,
  Sort,
  SortDown,
  SortUp,
  Stamp,
  Star,
  StarFilled,
  Stopwatch,
  SuccessFilled,
  Sugar,
  Suitcase,
  Sunny,
  Sunrise,
  Sunset,
  Switch,
  SwitchButton,
  TakeawayBox,
  Ticket,
  Tickets,
  Timer,
  ToiletPaper,
  Tools,
  Top,
  TopLeft,
  TopRight,
  TrendCharts,
  Trophy,
  TurnOff,
  Umbrella,
  Unlock,
  Upload,
  UploadFilled,
  User,
  UserFilled,
  Van,
  VideoCamera,
  VideoCameraFilled,
  VideoPause,
  VideoPlay,
  View,
  Wallet,
  WalletFilled,
  Warning,
  WarningFilled,
  Watch,
  Watermelon,
  WindPower,
  ZoomIn,
  ZoomOut,
} from '@element-plus/icons'
import { defineClientAppEnhance } from '@vuepress/client'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

export default defineClientAppEnhance(({ app }) => {
  app.use(ElementPlus)
  app.component('IconAim', Aim)
  app.component('IconAddLocation', AddLocation)
  app.component('IconApple', Apple)
  app.component('IconAlarmClock', AlarmClock)
  app.component('IconArrowDown', ArrowDown)
  app.component('IconArrowDownBold', ArrowDownBold)
  app.component('IconArrowLeft', ArrowLeft)
  app.component('IconArrowLeftBold', ArrowLeftBold)
  app.component('IconArrowRightBold', ArrowRightBold)
  app.component('IconArrowUp', ArrowUp)
  app.component('IconBack', Back)
  app.component('IconBell', Bell)
  app.component('IconBaseball', Baseball)
  app.component('IconBicycle', Bicycle)
  app.component('IconBellFilled', BellFilled)
  app.component('IconBasketball', Basketball)
  app.component('IconBottom', Bottom)
  app.component('IconBox', Box)
  app.component('IconBriefcase', Briefcase)
  app.component('IconBrushFilled', BrushFilled)
  app.component('IconBowl', Bowl)
  app.component('IconAvatar', Avatar)
  app.component('IconBrush', Brush)
  app.component('IconBurger', Burger)
  app.component('IconCamera', Camera)
  app.component('IconBottomLeft', BottomLeft)
  app.component('IconCalendar', Calendar)
  app.component('IconCaretBottom', CaretBottom)
  app.component('IconCaretLeft', CaretLeft)
  app.component('IconCaretRight', CaretRight)
  app.component('IconCaretTop', CaretTop)
  app.component('IconChatDotSquare', ChatDotSquare)
  app.component('IconCellphone', Cellphone)
  app.component('IconChatDotRound', ChatDotRound)
  app.component('IconChatLineSquare', ChatLineSquare)
  app.component('IconChatLineRound', ChatLineRound)
  app.component('IconChatRound', ChatRound)
  app.component('IconCheck', Check)
  app.component('IconChatSquare', ChatSquare)
  app.component('IconCherry', Cherry)
  app.component('IconChicken', Chicken)
  app.component('IconCircleCheckFilled', CircleCheckFilled)
  app.component('IconCircleCheck', CircleCheck)
  app.component('IconChecked', Checked)
  app.component('IconCircleCloseFilled', CircleCloseFilled)
  app.component('IconCircleClose', CircleClose)
  app.component('IconArrowRight', ArrowRight)
  app.component('IconCirclePlus', CirclePlus)
  app.component('IconClock', Clock)
  app.component('IconCloseBold', CloseBold)
  app.component('IconClose', Close)
  app.component('IconCloudy', Cloudy)
  app.component('IconCirclePlusFilled', CirclePlusFilled)
  app.component('IconCoffeeCup', CoffeeCup)
  app.component('IconColdDrink', ColdDrink)
  app.component('IconCoin', Coin)
  app.component('IconArrowUpBold', ArrowUpBold)
  app.component('IconCollectionTag', CollectionTag)
  app.component('IconBottomRight', BottomRight)
  app.component('IconCoffee', Coffee)
  app.component('IconCameraFilled', CameraFilled)
  app.component('IconCollection', Collection)
  app.component('IconCpu', Cpu)
  app.component('IconCrop', Crop)
  app.component('IconCoordinate', Coordinate)
  app.component('IconDArrowLeft', DArrowLeft)
  app.component('IconCompass', Compass)
  app.component('IconConnection', Connection)
  app.component('IconCreditCard', CreditCard)
  app.component('IconDataBoard', DataBoard)
  app.component('IconDArrowRight', DArrowRight)
  app.component('IconDessert', Dessert)
  app.component('IconDeleteLocation', DeleteLocation)
  app.component('IconDCaret', DCaret)
  app.component('IconDelete', Delete)
  app.component('IconDish', Dish)
  app.component('IconDishDot', DishDot)
  app.component('IconDocumentCopy', DocumentCopy)
  app.component('IconDiscount', Discount)
  app.component('IconDocumentChecked', DocumentChecked)
  app.component('IconDocumentAdd', DocumentAdd)
  app.component('IconDocumentRemove', DocumentRemove)
  app.component('IconDataAnalysis', DataAnalysis)
  app.component('IconDeleteFilled', DeleteFilled)
  app.component('IconDownload', Download)
  app.component('IconDrizzling', Drizzling)
  app.component('IconEleme', Eleme)
  app.component('IconElemeFilled', ElemeFilled)
  app.component('IconEdit', Edit)
  app.component('IconFailed', Failed)
  app.component('IconExpand', Expand)
  app.component('IconFemale', Female)
  app.component('IconDocument', Document)
  app.component('IconFilm', Film)
  app.component('IconFinished', Finished)
  app.component('IconDataLine', DataLine)
  app.component('IconFilter', Filter)
  app.component('IconFlag', Flag)
  app.component('IconFolderChecked', FolderChecked)
  app.component('IconFirstAidKit', FirstAidKit)
  app.component('IconFolderAdd', FolderAdd)
  app.component('IconFold', Fold)
  app.component('IconFolderDelete', FolderDelete)
  app.component('IconDocumentDelete', DocumentDelete)
  app.component('IconFolder', Folder)
  app.component('IconFood', Food)
  app.component('IconFolderOpened', FolderOpened)
  app.component('IconFootball', Football)
  app.component('IconFolderRemove', FolderRemove)
  app.component('IconFries', Fries)
  app.component('IconFullScreen', FullScreen)
  app.component('IconForkSpoon', ForkSpoon)
  app.component('IconGoblet', Goblet)
  app.component('IconGobletFull', GobletFull)
  app.component('IconGoods', Goods)
  app.component('IconGobletSquareFull', GobletSquareFull)
  app.component('IconGoodsFilled', GoodsFilled)
  app.component('IconGrid', Grid)
  app.component('IconGrape', Grape)
  app.component('IconGobletSquare', GobletSquare)
  app.component('IconHeadset', Headset)
  app.component('IconComment', Comment)
  app.component('IconHelpFilled', HelpFilled)
  app.component('IconHistogram', Histogram)
  app.component('IconHomeFilled', HomeFilled)
  app.component('IconHelp', Help)
  app.component('IconHouse', House)
  app.component('IconIceCreamRound', IceCreamRound)
  app.component('IconHotWater', HotWater)
  app.component('IconIceCream', IceCream)
  app.component('IconFiles', Files)
  app.component('IconIceCreamSquare', IceCreamSquare)
  app.component('IconKey', Key)
  app.component('IconIceTea', IceTea)
  app.component('IconKnifeFork', KnifeFork)
  app.component('IconIphone', Iphone)
  app.component('IconInfoFilled', InfoFilled)
  app.component('IconLink', Link)
  app.component('IconIceDrink', IceDrink)
  app.component('IconLightning', Lightning)
  app.component('IconLoading', Loading)
  app.component('IconLollipop', Lollipop)
  app.component('IconLocationInformation', LocationInformation)
  app.component('IconLock', Lock)
  app.component('IconLocationFilled', LocationFilled)
  app.component('IconMagnet', Magnet)
  app.component('IconMale', Male)
  app.component('IconLocation', Location)
  app.component('IconMenu', Menu)
  app.component('IconMagicStick', MagicStick)
  app.component('IconMessageBox', MessageBox)
  app.component('IconMapLocation', MapLocation)
  app.component('IconMic', Mic)
  app.component('IconMessage', Message)
  app.component('IconMedal', Medal)
  app.component('IconMilkTea', MilkTea)
  app.component('IconMicrophone', Microphone)
  app.component('IconMinus', Minus)
  app.component('IconMoney', Money)
  app.component('IconMoonNight', MoonNight)
  app.component('IconMonitor', Monitor)
  app.component('IconMoon', Moon)
  app.component('IconMore', More)
  app.component('IconMostlyCloudy', MostlyCloudy)
  app.component('IconMoreFilled', MoreFilled)
  app.component('IconMouse', Mouse)
  app.component('IconMug', Mug)
  app.component('IconMute', Mute)
  app.component('IconNoSmoking', NoSmoking)
  app.component('IconMuteNotification', MuteNotification)
  app.component('IconNotification', Notification)
  app.component('IconNotebook', Notebook)
  app.component('IconOdometer', Odometer)
  app.component('IconOfficeBuilding', OfficeBuilding)
  app.component('IconOperation', Operation)
  app.component('IconOpportunity', Opportunity)
  app.component('IconOrange', Orange)
  app.component('IconOpen', Open)
  app.component('IconPaperclip', Paperclip)
  app.component('IconPear', Pear)
  app.component('IconPartlyCloudy', PartlyCloudy)
  app.component('IconPhone', Phone)
  app.component('IconPictureFilled', PictureFilled)
  app.component('IconPhoneFilled', PhoneFilled)
  app.component('IconPictureRounded', PictureRounded)
  app.component('IconGuide', Guide)
  app.component('IconPlace', Place)
  app.component('IconPlatform', Platform)
  app.component('IconPieChart', PieChart)
  app.component('IconPointer', Pointer)
  app.component('IconPlus', Plus)
  app.component('IconPosition', Position)
  app.component('IconPostcard', Postcard)
  app.component('IconPresent', Present)
  app.component('IconPriceTag', PriceTag)
  app.component('IconPromotion', Promotion)
  app.component('IconPouring', Pouring)
  app.component('IconReadingLamp', ReadingLamp)
  app.component('IconQuestionFilled', QuestionFilled)
  app.component('IconPrinter', Printer)
  app.component('IconPicture', Picture)
  app.component('IconRefreshRight', RefreshRight)
  app.component('IconReading', Reading)
  app.component('IconRefreshLeft', RefreshLeft)
  app.component('IconRefresh', Refresh)
  app.component('IconRefrigerator', Refrigerator)
  app.component('IconRemoveFilled', RemoveFilled)
  app.component('IconRight', Right)
  app.component('IconScaleToOriginal', ScaleToOriginal)
  app.component('IconSchool', School)
  app.component('IconRemove', Remove)
  app.component('IconScissor', Scissor)
  app.component('IconSelect', Select)
  app.component('IconManagement', Management)
  app.component('IconSearch', Search)
  app.component('IconSell', Sell)
  app.component('IconSemiSelect', SemiSelect)
  app.component('IconShare', Share)
  app.component('IconSetting', Setting)
  app.component('IconService', Service)
  app.component('IconShip', Ship)
  app.component('IconSetUp', SetUp)
  app.component('IconShoppingBag', ShoppingBag)
  app.component('IconShop', Shop)
  app.component('IconShoppingCart', ShoppingCart)
  app.component('IconShoppingCartFull', ShoppingCartFull)
  app.component('IconSoccer', Soccer)
  app.component('IconSoldOut', SoldOut)
  app.component('IconSmoking', Smoking)
  app.component('IconSortDown', SortDown)
  app.component('IconSort', Sort)
  app.component('IconSortUp', SortUp)
  app.component('IconStar', Star)
  app.component('IconStamp', Stamp)
  app.component('IconStarFilled', StarFilled)
  app.component('IconStopwatch', Stopwatch)
  app.component('IconSuccessFilled', SuccessFilled)
  app.component('IconSuitcase', Suitcase)
  app.component('IconSugar', Sugar)
  app.component('IconSunny', Sunny)
  app.component('IconSunrise', Sunrise)
  app.component('IconSwitch', Switch)
  app.component('IconTicket', Ticket)
  app.component('IconSunset', Sunset)
  app.component('IconTickets', Tickets)
  app.component('IconSwitchButton', SwitchButton)
  app.component('IconTakeawayBox', TakeawayBox)
  app.component('IconToiletPaper', ToiletPaper)
  app.component('IconTimer', Timer)
  app.component('IconTools', Tools)
  app.component('IconTopLeft', TopLeft)
  app.component('IconTop', Top)
  app.component('IconTopRight', TopRight)
  app.component('IconTrendCharts', TrendCharts)
  app.component('IconTurnOff', TurnOff)
  app.component('IconUnlock', Unlock)
  app.component('IconTrophy', Trophy)
  app.component('IconUmbrella', Umbrella)
  app.component('IconUploadFilled', UploadFilled)
  app.component('IconUserFilled', UserFilled)
  app.component('IconUpload', Upload)
  app.component('IconUser', User)
  app.component('IconVan', Van)
  app.component('IconCopyDocument', CopyDocument)
  app.component('IconVideoPause', VideoPause)
  app.component('IconVideoCameraFilled', VideoCameraFilled)
  app.component('IconView', View)
  app.component('IconWallet', Wallet)
  app.component('IconWarningFilled', WarningFilled)
  app.component('IconWatch', Watch)
  app.component('IconVideoPlay', VideoPlay)
  app.component('IconWatermelon', Watermelon)
  app.component('IconVideoCamera', VideoCamera)
  app.component('IconWalletFilled', WalletFilled)
  app.component('IconWarning', Warning)
  app.component('IconList', List)
  app.component('IconZoomIn', ZoomIn)
  app.component('IconZoomOut', ZoomOut)
  app.component('IconRank', Rank)
  app.component('IconWindPower', WindPower)
})
