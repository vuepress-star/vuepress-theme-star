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
  app.component('ElIconAim', Aim)
  app.component('ElIconAddLocation', AddLocation)
  app.component('ElIconApple', Apple)
  app.component('ElIconAlarmClock', AlarmClock)
  app.component('ElIconArrowDown', ArrowDown)
  app.component('ElIconArrowDownBold', ArrowDownBold)
  app.component('ElIconArrowLeft', ArrowLeft)
  app.component('ElIconArrowLeftBold', ArrowLeftBold)
  app.component('ElIconArrowRightBold', ArrowRightBold)
  app.component('ElIconArrowUp', ArrowUp)
  app.component('ElIconBack', Back)
  app.component('ElIconBell', Bell)
  app.component('ElIconBaseball', Baseball)
  app.component('ElIconBicycle', Bicycle)
  app.component('ElIconBellFilled', BellFilled)
  app.component('ElIconBasketball', Basketball)
  app.component('ElIconBottom', Bottom)
  app.component('ElIconBox', Box)
  app.component('ElIconBriefcase', Briefcase)
  app.component('ElIconBrushFilled', BrushFilled)
  app.component('ElIconBowl', Bowl)
  app.component('ElIconAvatar', Avatar)
  app.component('ElIconBrush', Brush)
  app.component('ElIconBurger', Burger)
  app.component('ElIconCamera', Camera)
  app.component('ElIconBottomLeft', BottomLeft)
  app.component('ElIconCalendar', Calendar)
  app.component('ElIconCaretBottom', CaretBottom)
  app.component('ElIconCaretLeft', CaretLeft)
  app.component('ElIconCaretRight', CaretRight)
  app.component('ElIconCaretTop', CaretTop)
  app.component('ElIconChatDotSquare', ChatDotSquare)
  app.component('ElIconCellphone', Cellphone)
  app.component('ElIconChatDotRound', ChatDotRound)
  app.component('ElIconChatLineSquare', ChatLineSquare)
  app.component('ElIconChatLineRound', ChatLineRound)
  app.component('ElIconChatRound', ChatRound)
  app.component('ElIconCheck', Check)
  app.component('ElIconChatSquare', ChatSquare)
  app.component('ElIconCherry', Cherry)
  app.component('ElIconChicken', Chicken)
  app.component('ElIconCircleCheckFilled', CircleCheckFilled)
  app.component('ElIconCircleCheck', CircleCheck)
  app.component('ElIconChecked', Checked)
  app.component('ElIconCircleCloseFilled', CircleCloseFilled)
  app.component('ElIconCircleClose', CircleClose)
  app.component('ElIconArrowRight', ArrowRight)
  app.component('ElIconCirclePlus', CirclePlus)
  app.component('ElIconClock', Clock)
  app.component('ElIconCloseBold', CloseBold)
  app.component('ElIconClose', Close)
  app.component('ElIconCloudy', Cloudy)
  app.component('ElIconCirclePlusFilled', CirclePlusFilled)
  app.component('ElIconCoffeeCup', CoffeeCup)
  app.component('ElIconColdDrink', ColdDrink)
  app.component('ElIconCoin', Coin)
  app.component('ElIconArrowUpBold', ArrowUpBold)
  app.component('ElIconCollectionTag', CollectionTag)
  app.component('ElIconBottomRight', BottomRight)
  app.component('ElIconCoffee', Coffee)
  app.component('ElIconCameraFilled', CameraFilled)
  app.component('ElIconCollection', Collection)
  app.component('ElIconCpu', Cpu)
  app.component('ElIconCrop', Crop)
  app.component('ElIconCoordinate', Coordinate)
  app.component('ElIconDArrowLeft', DArrowLeft)
  app.component('ElIconCompass', Compass)
  app.component('ElIconConnection', Connection)
  app.component('ElIconCreditCard', CreditCard)
  app.component('ElIconDataBoard', DataBoard)
  app.component('ElIconDArrowRight', DArrowRight)
  app.component('ElIconDessert', Dessert)
  app.component('ElIconDeleteLocation', DeleteLocation)
  app.component('ElIconDCaret', DCaret)
  app.component('ElIconDelete', Delete)
  app.component('ElIconDish', Dish)
  app.component('ElIconDishDot', DishDot)
  app.component('ElIconDocumentCopy', DocumentCopy)
  app.component('ElIconDiscount', Discount)
  app.component('ElIconDocumentChecked', DocumentChecked)
  app.component('ElIconDocumentAdd', DocumentAdd)
  app.component('ElIconDocumentRemove', DocumentRemove)
  app.component('ElIconDataAnalysis', DataAnalysis)
  app.component('ElIconDeleteFilled', DeleteFilled)
  app.component('ElIconDownload', Download)
  app.component('ElIconDrizzling', Drizzling)
  app.component('ElIconEleme', Eleme)
  app.component('ElIconElemeFilled', ElemeFilled)
  app.component('ElIconEdit', Edit)
  app.component('ElIconFailed', Failed)
  app.component('ElIconExpand', Expand)
  app.component('ElIconFemale', Female)
  app.component('ElIconDocument', Document)
  app.component('ElIconFilm', Film)
  app.component('ElIconFinished', Finished)
  app.component('ElIconDataLine', DataLine)
  app.component('ElIconFilter', Filter)
  app.component('ElIconFlag', Flag)
  app.component('ElIconFolderChecked', FolderChecked)
  app.component('ElIconFirstAidKit', FirstAidKit)
  app.component('ElIconFolderAdd', FolderAdd)
  app.component('ElIconFold', Fold)
  app.component('ElIconFolderDelete', FolderDelete)
  app.component('ElIconDocumentDelete', DocumentDelete)
  app.component('ElIconFolder', Folder)
  app.component('ElIconFood', Food)
  app.component('ElIconFolderOpened', FolderOpened)
  app.component('ElIconFootball', Football)
  app.component('ElIconFolderRemove', FolderRemove)
  app.component('ElIconFries', Fries)
  app.component('ElIconFullScreen', FullScreen)
  app.component('ElIconForkSpoon', ForkSpoon)
  app.component('ElIconGoblet', Goblet)
  app.component('ElIconGobletFull', GobletFull)
  app.component('ElIconGoods', Goods)
  app.component('ElIconGobletSquareFull', GobletSquareFull)
  app.component('ElIconGoodsFilled', GoodsFilled)
  app.component('ElIconGrid', Grid)
  app.component('ElIconGrape', Grape)
  app.component('ElIconGobletSquare', GobletSquare)
  app.component('ElIconHeadset', Headset)
  app.component('ElIconComment', Comment)
  app.component('ElIconHelpFilled', HelpFilled)
  app.component('ElIconHistogram', Histogram)
  app.component('ElIconHomeFilled', HomeFilled)
  app.component('ElIconHelp', Help)
  app.component('ElIconHouse', House)
  app.component('ElIconIceCreamRound', IceCreamRound)
  app.component('ElIconHotWater', HotWater)
  app.component('ElIconIceCream', IceCream)
  app.component('ElIconFiles', Files)
  app.component('ElIconIceCreamSquare', IceCreamSquare)
  app.component('ElIconKey', Key)
  app.component('ElIconIceTea', IceTea)
  app.component('ElIconKnifeFork', KnifeFork)
  app.component('ElIconIphone', Iphone)
  app.component('ElIconInfoFilled', InfoFilled)
  app.component('ElIconLink', Link)
  app.component('ElIconIceDrink', IceDrink)
  app.component('ElIconLightning', Lightning)
  app.component('ElIconLoading', Loading)
  app.component('ElIconLollipop', Lollipop)
  app.component('ElIconLocationInformation', LocationInformation)
  app.component('ElIconLock', Lock)
  app.component('ElIconLocationFilled', LocationFilled)
  app.component('ElIconMagnet', Magnet)
  app.component('ElIconMale', Male)
  app.component('ElIconLocation', Location)
  app.component('ElIconMenu', Menu)
  app.component('ElIconMagicStick', MagicStick)
  app.component('ElIconMessageBox', MessageBox)
  app.component('ElIconMapLocation', MapLocation)
  app.component('ElIconMic', Mic)
  app.component('ElIconMessage', Message)
  app.component('ElIconMedal', Medal)
  app.component('ElIconMilkTea', MilkTea)
  app.component('ElIconMicrophone', Microphone)
  app.component('ElIconMinus', Minus)
  app.component('ElIconMoney', Money)
  app.component('ElIconMoonNight', MoonNight)
  app.component('ElIconMonitor', Monitor)
  app.component('ElIconMoon', Moon)
  app.component('ElIconMore', More)
  app.component('ElIconMostlyCloudy', MostlyCloudy)
  app.component('ElIconMoreFilled', MoreFilled)
  app.component('ElIconMouse', Mouse)
  app.component('ElIconMug', Mug)
  app.component('ElIconMute', Mute)
  app.component('ElIconNoSmoking', NoSmoking)
  app.component('ElIconMuteNotification', MuteNotification)
  app.component('ElIconNotification', Notification)
  app.component('ElIconNotebook', Notebook)
  app.component('ElIconOdometer', Odometer)
  app.component('ElIconOfficeBuilding', OfficeBuilding)
  app.component('ElIconOperation', Operation)
  app.component('ElIconOpportunity', Opportunity)
  app.component('ElIconOrange', Orange)
  app.component('ElIconOpen', Open)
  app.component('ElIconPaperclip', Paperclip)
  app.component('ElIconPear', Pear)
  app.component('ElIconPartlyCloudy', PartlyCloudy)
  app.component('ElIconPhone', Phone)
  app.component('ElIconPictureFilled', PictureFilled)
  app.component('ElIconPhoneFilled', PhoneFilled)
  app.component('ElIconPictureRounded', PictureRounded)
  app.component('ElIconGuide', Guide)
  app.component('ElIconPlace', Place)
  app.component('ElIconPlatform', Platform)
  app.component('ElIconPieChart', PieChart)
  app.component('ElIconPointer', Pointer)
  app.component('ElIconPlus', Plus)
  app.component('ElIconPosition', Position)
  app.component('ElIconPostcard', Postcard)
  app.component('ElIconPresent', Present)
  app.component('ElIconPriceTag', PriceTag)
  app.component('ElIconPromotion', Promotion)
  app.component('ElIconPouring', Pouring)
  app.component('ElIconReadingLamp', ReadingLamp)
  app.component('ElIconQuestionFilled', QuestionFilled)
  app.component('ElIconPrinter', Printer)
  app.component('ElIconPicture', Picture)
  app.component('ElIconRefreshRight', RefreshRight)
  app.component('ElIconReading', Reading)
  app.component('ElIconRefreshLeft', RefreshLeft)
  app.component('ElIconRefresh', Refresh)
  app.component('ElIconRefrigerator', Refrigerator)
  app.component('ElIconRemoveFilled', RemoveFilled)
  app.component('ElIconRight', Right)
  app.component('ElIconScaleToOriginal', ScaleToOriginal)
  app.component('ElIconSchool', School)
  app.component('ElIconRemove', Remove)
  app.component('ElIconScissor', Scissor)
  app.component('ElIconSelect', Select)
  app.component('ElIconManagement', Management)
  app.component('ElIconSearch', Search)
  app.component('ElIconSell', Sell)
  app.component('ElIconSemiSelect', SemiSelect)
  app.component('ElIconShare', Share)
  app.component('ElIconSetting', Setting)
  app.component('ElIconService', Service)
  app.component('ElIconShip', Ship)
  app.component('ElIconSetUp', SetUp)
  app.component('ElIconShoppingBag', ShoppingBag)
  app.component('ElIconShop', Shop)
  app.component('ElIconShoppingCart', ShoppingCart)
  app.component('ElIconShoppingCartFull', ShoppingCartFull)
  app.component('ElIconSoccer', Soccer)
  app.component('ElIconSoldOut', SoldOut)
  app.component('ElIconSmoking', Smoking)
  app.component('ElIconSortDown', SortDown)
  app.component('ElIconSort', Sort)
  app.component('ElIconSortUp', SortUp)
  app.component('ElIconStar', Star)
  app.component('ElIconStamp', Stamp)
  app.component('ElIconStarFilled', StarFilled)
  app.component('ElIconStopwatch', Stopwatch)
  app.component('ElIconSuccessFilled', SuccessFilled)
  app.component('ElIconSuitcase', Suitcase)
  app.component('ElIconSugar', Sugar)
  app.component('ElIconSunny', Sunny)
  app.component('ElIconSunrise', Sunrise)
  app.component('ElIconSwitch', Switch)
  app.component('ElIconTicket', Ticket)
  app.component('ElIconSunset', Sunset)
  app.component('ElIconTickets', Tickets)
  app.component('ElIconSwitchButton', SwitchButton)
  app.component('ElIconTakeawayBox', TakeawayBox)
  app.component('ElIconToiletPaper', ToiletPaper)
  app.component('ElIconTimer', Timer)
  app.component('ElIconTools', Tools)
  app.component('ElIconTopLeft', TopLeft)
  app.component('ElIconTop', Top)
  app.component('ElIconTopRight', TopRight)
  app.component('ElIconTrendCharts', TrendCharts)
  app.component('ElIconTurnOff', TurnOff)
  app.component('ElIconUnlock', Unlock)
  app.component('ElIconTrophy', Trophy)
  app.component('ElIconUmbrella', Umbrella)
  app.component('ElIconUploadFilled', UploadFilled)
  app.component('ElIconUserFilled', UserFilled)
  app.component('ElIconUpload', Upload)
  app.component('ElIconUser', User)
  app.component('ElIconVan', Van)
  app.component('ElIconCopyDocument', CopyDocument)
  app.component('ElIconVideoPause', VideoPause)
  app.component('ElIconVideoCameraFilled', VideoCameraFilled)
  app.component('ElIconView', View)
  app.component('ElIconWallet', Wallet)
  app.component('ElIconWarningFilled', WarningFilled)
  app.component('ElIconWatch', Watch)
  app.component('ElIconVideoPlay', VideoPlay)
  app.component('ElIconWatermelon', Watermelon)
  app.component('ElIconVideoCamera', VideoCamera)
  app.component('ElIconWalletFilled', WalletFilled)
  app.component('ElIconWarning', Warning)
  app.component('ElIconList', List)
  app.component('ElIconZoomIn', ZoomIn)
  app.component('ElIconZoomOut', ZoomOut)
  app.component('ElIconRank', Rank)
  app.component('ElIconWindPower', WindPower)
})
