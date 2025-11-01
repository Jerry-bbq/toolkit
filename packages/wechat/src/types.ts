/**
 * 授权 URL 选项
 */
export interface AuthUrlOptions {
  appId: string;
  redirectUri: string;
  scope?: 'snsapi_base' | 'snsapi_userinfo';
  state?: string;
}

/**
 * Access Token 响应
 */
export interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
}

/**
 * 刷新 Token 响应
 */
export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
}

/**
 * 用户信息响应
 */
export interface UserInfoResponse {
  openid: string;
  nickname: string;
  sex: number;
  province: string;
  city: string;
  country: string;
  headimgurl: string;
  privilege: string[];
  unionid?: string;
}

/**
 * 验证 Token 响应
 */
export interface VerifyTokenResponse {
  errcode?: number;
  errmsg?: string;
}

/**
 * 微信 API 错误响应
 */
export interface WeChatErrorResponse {
  errcode: number;
  errmsg: string;
}

/**
 * 微信 API 错误代码枚举
 */
export enum WeChatErrorCode {
  /** 系统繁忙，此时请开发者稍候再试 */
  SYSTEM_BUSY = -1,
  /** 请求成功 */
  SUCCESS = 0,
  /** 获取 access_token 时 AppSecret 错误，或者 access_token 无效 */
  INVALID_ACCESS_TOKEN = 40001,
  /** 不合法的凭证类型 */
  INVALID_CREDENTIAL_TYPE = 40002,
  /** 不合法的 OpenID */
  INVALID_OPENID = 40003,
  /** 不合法的媒体文件类型 */
  INVALID_MEDIA_TYPE = 40004,
  /** 不合法的文件类型 */
  INVALID_FILE_TYPE = 40005,
  /** 不合法的文件大小 */
  INVALID_FILE_SIZE = 40006,
  /** 不合法的媒体文件 id */
  INVALID_MEDIA_ID = 40007,
  /** 不合法的消息类型 */
  INVALID_MESSAGE_TYPE = 40008,
  /** 不合法的图片文件大小 */
  INVALID_IMAGE_SIZE = 40009,
  /** 不合法的语音文件大小 */
  INVALID_VOICE_SIZE = 40010,
  /** 不合法的视频文件大小 */
  INVALID_VIDEO_SIZE = 40011,
  /** 不合法的缩略图文件大小 */
  INVALID_THUMB_SIZE = 40012,
  /** 不合法的 AppID */
  INVALID_APPID = 40013,
  /** 不合法的 access_token */
  INVALID_ACCESS_TOKEN_PARAM = 40014,
  /** 不合法的菜单按钮类型 */
  INVALID_MENU_TYPE = 40015,
  /** 不合法的按钮个数 */
  INVALID_BUTTON_COUNT = 40016,
  /** 不合法的按钮个数 */
  INVALID_BUTTON_COUNT_2 = 40017,
  /** 不合法的按钮名字长度 */
  INVALID_BUTTON_NAME_LENGTH = 40018,
  /** 不合法的按钮 KEY 长度 */
  INVALID_BUTTON_KEY_LENGTH = 40019,
  /** 不合法的按钮 URL 长度 */
  INVALID_BUTTON_URL_LENGTH = 40020,
  /** 不合法的菜单版本号 */
  INVALID_MENU_VERSION = 40021,
  /** 不合法的子菜单级数 */
  INVALID_SUB_MENU_LEVEL = 40022,
  /** 不合法的子菜单按钮个数 */
  INVALID_SUB_MENU_BUTTON_COUNT = 40023,
  /** 不合法的子菜单按钮类型 */
  INVALID_SUB_MENU_BUTTON_TYPE = 40024,
  /** 不合法的子菜单按钮名字长度 */
  INVALID_SUB_MENU_BUTTON_NAME_LENGTH = 40025,
  /** 不合法的子菜单按钮 KEY 长度 */
  INVALID_SUB_MENU_BUTTON_KEY_LENGTH = 40026,
  /** 不合法的子菜单按钮 URL 长度 */
  INVALID_SUB_MENU_BUTTON_URL_LENGTH = 40027,
  /** 不合法的自定义菜单使用用户 */
  INVALID_CUSTOM_MENU_USER = 40028,
  /** 不合法的 oauth_code */
  INVALID_OAUTH_CODE = 40029,
  /** 不合法的 refresh_token */
  INVALID_REFRESH_TOKEN = 40030,
  /** 不合法的 openid 列表 */
  INVALID_OPENID_LIST = 40031,
  /** 不合法的 openid 列表长度 */
  INVALID_OPENID_LIST_SIZE = 40032,
  /** 不合法的请求字符，不能包含 \uxxxx 格式的字符 */
  INVALID_REQUEST_CHARS = 40033,
  /** 不合法的参数 */
  INVALID_PARAM = 40035,
  /** 不合法的请求格式 */
  INVALID_REQUEST_FORMAT = 40038,
  /** 不合法的 URL 长度 */
  INVALID_URL_LENGTH = 40039,
  /** 不合法的分组 id */
  INVALID_GROUP_ID = 40050,
  /** 分组名字不合法 */
  INVALID_GROUP_NAME = 40051,
  /** 缺少 access_token 参数 */
  MISSING_ACCESS_TOKEN = 41001,
  /** 缺少 appid 参数 */
  MISSING_APPID = 41002,
  /** 缺少 refresh_token 参数 */
  MISSING_REFRESH_TOKEN = 41003,
  /** 缺少 secret 参数 */
  MISSING_SECRET = 41004,
  /** 缺少多媒体文件数据 */
  MISSING_MEDIA_DATA = 41005,
  /** 缺少 media_id 参数 */
  MISSING_MEDIA_ID = 41006,
  /** 缺少子菜单数据 */
  MISSING_SUB_MENU_DATA = 41007,
  /** 缺少 oauth code */
  MISSING_OAUTH_CODE = 41008,
  /** 缺少 openid */
  MISSING_OPENID = 41009,
  /** access_token 超时，请检查 access_token 的有效期 */
  ACCESS_TOKEN_EXPIRED = 42001,
  /** refresh_token 超时 */
  REFRESH_TOKEN_EXPIRED = 42002,
  /** oauth_code 超时 */
  OAUTH_CODE_EXPIRED = 42003,
  /** 需要 GET 请求 */
  REQUIRE_GET = 43001,
  /** 需要 POST 请求 */
  REQUIRE_POST = 43002,
  /** 需要 HTTPS 请求 */
  REQUIRE_HTTPS = 43003,
  /** 需要接收者关注 */
  REQUIRE_SUBSCRIBE = 43004,
  /** 需要好友关系 */
  REQUIRE_FRIEND = 43005,
  /** 多媒体文件为空 */
  EMPTY_MEDIA = 44001,
  /** POST 的数据包为空 */
  EMPTY_POST_DATA = 44002,
  /** 图文消息内容为空 */
  EMPTY_NEWS = 44003,
  /** 文本消息内容为空 */
  EMPTY_TEXT = 44004,
  /** 多媒体文件大小超过限制 */
  MEDIA_SIZE_EXCEEDED = 45001,
  /** 消息内容超过限制 */
  MESSAGE_SIZE_EXCEEDED = 45002,
  /** 标题字段超过限制 */
  TITLE_SIZE_EXCEEDED = 45003,
  /** 描述字段超过限制 */
  DESCRIPTION_SIZE_EXCEEDED = 45004,
  /** 链接字段超过限制 */
  LINK_SIZE_EXCEEDED = 45005,
  /** 图片链接字段超过限制 */
  IMAGE_LINK_SIZE_EXCEEDED = 45006,
  /** 语音播放时间超过限制 */
  VOICE_DURATION_EXCEEDED = 45007,
  /** 图文消息超过限制 */
  NEWS_SIZE_EXCEEDED = 45008,
  /** 接口调用超过限制 */
  API_CALL_LIMIT = 45009,
  /** 创建菜单个数超过限制 */
  MENU_COUNT_EXCEEDED = 45010,
  /** 回复时间超过限制 */
  REPLY_TIME_EXCEEDED = 45015,
  /** 系统分组，不允许修改 */
  SYSTEM_GROUP = 45016,
  /** 分组名字过长 */
  GROUP_NAME_TOO_LONG = 45017,
  /** 分组数量超过上限 */
  GROUP_COUNT_EXCEEDED = 45018,
  /** 不存在媒体数据 */
  MEDIA_NOT_FOUND = 46001,
  /** 不存在的菜单数据 */
  MENU_NOT_FOUND = 46002,
  /** 不存在的用户 */
  USER_NOT_FOUND = 46003,
  /** 解析 JSON/XML 内容错误 */
  PARSE_ERROR = 47001,
  /** api 功能未授权 */
  API_UNAUTHORIZED = 48001,
  /** 用户拒收消息（用户设置拒收公众号消息） */
  USER_REJECTED = 48002,
  /** api 接口被封禁 */
  API_BANNED = 48004,
  /** api 禁止删除被自动回复和自定义菜单引用的素材 */
  API_DELETE_FORBIDDEN = 48005,
  /** api 禁止清零调用次数 */
  API_CLEAR_FORBIDDEN = 48006,
  /** 没有该类型消息的发送权限 */
  NO_SEND_PERMISSION = 48008,
  /** 未知错误 */
  UNKNOWN_ERROR = 99999,
}

/**
 * 微信 API 错误类
 */
export class WeChatError extends Error {
  /**
   * 错误代码
   */
  public readonly errcode: number;

  /**
   * 错误消息
   */
  public readonly errmsg: string;

  /**
   * 原始响应数据
   */
  public readonly raw?: unknown;

  constructor(errcode: number, errmsg: string, raw?: unknown) {
    super(`微信 API 错误 ${errcode}: ${errmsg}`);
    this.name = 'WeChatError';
    this.errcode = errcode;
    this.errmsg = errmsg;
    this.raw = raw;
    // 保持与 Error 类的原型链关系
    Object.setPrototypeOf(this, WeChatError.prototype);
  }

  /**
   * 是否为特定的错误代码
   */
  public is(code: WeChatErrorCode): boolean {
    return this.errcode === code;
  }

  /**
   * 从 API 响应创建错误
   */
  public static fromResponse(response: WeChatErrorResponse, raw?: unknown): WeChatError {
    return new WeChatError(response.errcode, response.errmsg, raw);
  }
}
