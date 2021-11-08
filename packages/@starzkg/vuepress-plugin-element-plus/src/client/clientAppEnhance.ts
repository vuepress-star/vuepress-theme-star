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
  app.component('Aim', Aim)
  app.component('AddLocation', AddLocation)
  app.component('Apple', Apple)
  app.component('AlarmClock', AlarmClock)
  app.component('ArrowDown', ArrowDown)
  app.component('ArrowDownBold', ArrowDownBold)
  app.component('ArrowLeft', ArrowLeft)
  app.component('ArrowLeftBold', ArrowLeftBold)
  app.component('ArrowRightBold', ArrowRightBold)
  app.component('ArrowUp', ArrowUp)
  app.component('Back', Back)
  app.component('Bell', Bell)
  app.component('Baseball', Baseball)
  app.component('Bicycle', Bicycle)
  app.component('BellFilled', BellFilled)
  app.component('Basketball', Basketball)
  app.component('Bottom', Bottom)
  app.component('Box', Box)
  app.component('Briefcase', Briefcase)
  app.component('BrushFilled', BrushFilled)
  app.component('Bowl', Bowl)
  app.component('Avatar', Avatar)
  app.component('Brush', Brush)
  app.component('Burger', Burger)
  app.component('Camera', Camera)
  app.component('BottomLeft', BottomLeft)
  app.component('Calendar', Calendar)
  app.component('CaretBottom', CaretBottom)
  app.component('CaretLeft', CaretLeft)
  app.component('CaretRight', CaretRight)
  app.component('CaretTop', CaretTop)
  app.component('ChatDotSquare', ChatDotSquare)
  app.component('Cellphone', Cellphone)
  app.component('ChatDotRound', ChatDotRound)
  app.component('ChatLineSquare', ChatLineSquare)
  app.component('ChatLineRound', ChatLineRound)
  app.component('ChatRound', ChatRound)
  app.component('Check', Check)
  app.component('ChatSquare', ChatSquare)
  app.component('Cherry', Cherry)
  app.component('Chicken', Chicken)
  app.component('CircleCheckFilled', CircleCheckFilled)
  app.component('CircleCheck', CircleCheck)
  app.component('Checked', Checked)
  app.component('CircleCloseFilled', CircleCloseFilled)
  app.component('CircleClose', CircleClose)
  app.component('ArrowRight', ArrowRight)
  app.component('CirclePlus', CirclePlus)
  app.component('Clock', Clock)
  app.component('CloseBold', CloseBold)
  app.component('Close', Close)
  app.component('Cloudy', Cloudy)
  app.component('CirclePlusFilled', CirclePlusFilled)
  app.component('CoffeeCup', CoffeeCup)
  app.component('ColdDrink', ColdDrink)
  app.component('Coin', Coin)
  app.component('ArrowUpBold', ArrowUpBold)
  app.component('CollectionTag', CollectionTag)
  app.component('BottomRight', BottomRight)
  app.component('Coffee', Coffee)
  app.component('CameraFilled', CameraFilled)
  app.component('Collection', Collection)
  app.component('Cpu', Cpu)
  app.component('Crop', Crop)
  app.component('Coordinate', Coordinate)
  app.component('DArrowLeft', DArrowLeft)
  app.component('Compass', Compass)
  app.component('Connection', Connection)
  app.component('CreditCard', CreditCard)
  app.component('DataBoard', DataBoard)
  app.component('DArrowRight', DArrowRight)
  app.component('Dessert', Dessert)
  app.component('DeleteLocation', DeleteLocation)
  app.component('DCaret', DCaret)
  app.component('Delete', Delete)
  app.component('Dish', Dish)
  app.component('DishDot', DishDot)
  app.component('DocumentCopy', DocumentCopy)
  app.component('Discount', Discount)
  app.component('DocumentChecked', DocumentChecked)
  app.component('DocumentAdd', DocumentAdd)
  app.component('DocumentRemove', DocumentRemove)
  app.component('DataAnalysis', DataAnalysis)
  app.component('DeleteFilled', DeleteFilled)
  app.component('Download', Download)
  app.component('Drizzling', Drizzling)
  app.component('Eleme', Eleme)
  app.component('ElemeFilled', ElemeFilled)
  app.component('Edit', Edit)
  app.component('Failed', Failed)
  app.component('Expand', Expand)
  app.component('Female', Female)
  app.component('Document', Document)
  app.component('Film', Film)
  app.component('Finished', Finished)
  app.component('DataLine', DataLine)
  app.component('Filter', Filter)
  app.component('Flag', Flag)
  app.component('FolderChecked', FolderChecked)
  app.component('FirstAidKit', FirstAidKit)
  app.component('FolderAdd', FolderAdd)
  app.component('Fold', Fold)
  app.component('FolderDelete', FolderDelete)
  app.component('DocumentDelete', DocumentDelete)
  app.component('Folder', Folder)
  app.component('Food', Food)
  app.component('FolderOpened', FolderOpened)
  app.component('Football', Football)
  app.component('FolderRemove', FolderRemove)
  app.component('Fries', Fries)
  app.component('FullScreen', FullScreen)
  app.component('ForkSpoon', ForkSpoon)
  app.component('Goblet', Goblet)
  app.component('GobletFull', GobletFull)
  app.component('Goods', Goods)
  app.component('GobletSquareFull', GobletSquareFull)
  app.component('GoodsFilled', GoodsFilled)
  app.component('Grid', Grid)
  app.component('Grape', Grape)
  app.component('GobletSquare', GobletSquare)
  app.component('Headset', Headset)
  app.component('Comment', Comment)
  app.component('HelpFilled', HelpFilled)
  app.component('Histogram', Histogram)
  app.component('HomeFilled', HomeFilled)
  app.component('Help', Help)
  app.component('House', House)
  app.component('IceCreamRound', IceCreamRound)
  app.component('HotWater', HotWater)
  app.component('IceCream', IceCream)
  app.component('Files', Files)
  app.component('IceCreamSquare', IceCreamSquare)
  app.component('Key', Key)
  app.component('IceTea', IceTea)
  app.component('KnifeFork', KnifeFork)
  app.component('Iphone', Iphone)
  app.component('InfoFilled', InfoFilled)
  app.component('Link', Link)
  app.component('IceDrink', IceDrink)
  app.component('Lightning', Lightning)
  app.component('Loading', Loading)
  app.component('Lollipop', Lollipop)
  app.component('LocationInformation', LocationInformation)
  app.component('Lock', Lock)
  app.component('LocationFilled', LocationFilled)
  app.component('Magnet', Magnet)
  app.component('Male', Male)
  app.component('Location', Location)
  app.component('Menu', Menu)
  app.component('MagicStick', MagicStick)
  app.component('MessageBox', MessageBox)
  app.component('MapLocation', MapLocation)
  app.component('Mic', Mic)
  app.component('Message', Message)
  app.component('Medal', Medal)
  app.component('MilkTea', MilkTea)
  app.component('Microphone', Microphone)
  app.component('Minus', Minus)
  app.component('Money', Money)
  app.component('MoonNight', MoonNight)
  app.component('Monitor', Monitor)
  app.component('Moon', Moon)
  app.component('More', More)
  app.component('MostlyCloudy', MostlyCloudy)
  app.component('MoreFilled', MoreFilled)
  app.component('Mouse', Mouse)
  app.component('Mug', Mug)
  app.component('Mute', Mute)
  app.component('NoSmoking', NoSmoking)
  app.component('MuteNotification', MuteNotification)
  app.component('Notification', Notification)
  app.component('Notebook', Notebook)
  app.component('Odometer', Odometer)
  app.component('OfficeBuilding', OfficeBuilding)
  app.component('Operation', Operation)
  app.component('Opportunity', Opportunity)
  app.component('Orange', Orange)
  app.component('Open', Open)
  app.component('Paperclip', Paperclip)
  app.component('Pear', Pear)
  app.component('PartlyCloudy', PartlyCloudy)
  app.component('Phone', Phone)
  app.component('PictureFilled', PictureFilled)
  app.component('PhoneFilled', PhoneFilled)
  app.component('PictureRounded', PictureRounded)
  app.component('Guide', Guide)
  app.component('Place', Place)
  app.component('Platform', Platform)
  app.component('PieChart', PieChart)
  app.component('Pointer', Pointer)
  app.component('Plus', Plus)
  app.component('Position', Position)
  app.component('Postcard', Postcard)
  app.component('Present', Present)
  app.component('PriceTag', PriceTag)
  app.component('Promotion', Promotion)
  app.component('Pouring', Pouring)
  app.component('ReadingLamp', ReadingLamp)
  app.component('QuestionFilled', QuestionFilled)
  app.component('Printer', Printer)
  app.component('Picture', Picture)
  app.component('RefreshRight', RefreshRight)
  app.component('Reading', Reading)
  app.component('RefreshLeft', RefreshLeft)
  app.component('Refresh', Refresh)
  app.component('Refrigerator', Refrigerator)
  app.component('RemoveFilled', RemoveFilled)
  app.component('Right', Right)
  app.component('ScaleToOriginal', ScaleToOriginal)
  app.component('School', School)
  app.component('Remove', Remove)
  app.component('Scissor', Scissor)
  app.component('Select', Select)
  app.component('Management', Management)
  app.component('Search', Search)
  app.component('Sell', Sell)
  app.component('SemiSelect', SemiSelect)
  app.component('Share', Share)
  app.component('Setting', Setting)
  app.component('Service', Service)
  app.component('Ship', Ship)
  app.component('SetUp', SetUp)
  app.component('ShoppingBag', ShoppingBag)
  app.component('Shop', Shop)
  app.component('ShoppingCart', ShoppingCart)
  app.component('ShoppingCartFull', ShoppingCartFull)
  app.component('Soccer', Soccer)
  app.component('SoldOut', SoldOut)
  app.component('Smoking', Smoking)
  app.component('SortDown', SortDown)
  app.component('Sort', Sort)
  app.component('SortUp', SortUp)
  app.component('Star', Star)
  app.component('Stamp', Stamp)
  app.component('StarFilled', StarFilled)
  app.component('Stopwatch', Stopwatch)
  app.component('SuccessFilled', SuccessFilled)
  app.component('Suitcase', Suitcase)
  app.component('Sugar', Sugar)
  app.component('Sunny', Sunny)
  app.component('Sunrise', Sunrise)
  app.component('Switch', Switch)
  app.component('Ticket', Ticket)
  app.component('Sunset', Sunset)
  app.component('Tickets', Tickets)
  app.component('SwitchButton', SwitchButton)
  app.component('TakeawayBox', TakeawayBox)
  app.component('ToiletPaper', ToiletPaper)
  app.component('Timer', Timer)
  app.component('Tools', Tools)
  app.component('TopLeft', TopLeft)
  app.component('Top', Top)
  app.component('TopRight', TopRight)
  app.component('TrendCharts', TrendCharts)
  app.component('TurnOff', TurnOff)
  app.component('Unlock', Unlock)
  app.component('Trophy', Trophy)
  app.component('Umbrella', Umbrella)
  app.component('UploadFilled', UploadFilled)
  app.component('UserFilled', UserFilled)
  app.component('Upload', Upload)
  app.component('User', User)
  app.component('Van', Van)
  app.component('CopyDocument', CopyDocument)
  app.component('VideoPause', VideoPause)
  app.component('VideoCameraFilled', VideoCameraFilled)
  app.component('View', View)
  app.component('Wallet', Wallet)
  app.component('WarningFilled', WarningFilled)
  app.component('Watch', Watch)
  app.component('VideoPlay', VideoPlay)
  app.component('Watermelon', Watermelon)
  app.component('VideoCamera', VideoCamera)
  app.component('WalletFilled', WalletFilled)
  app.component('Warning', Warning)
  app.component('List', List)
  app.component('ZoomIn', ZoomIn)
  app.component('ZoomOut', ZoomOut)
  app.component('Rank', Rank)
  app.component('WindPower', WindPower)
})
