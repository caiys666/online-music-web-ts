function saveUser(this: any, data: any): object {
  const userObj = {
    userName: data.account.userName,
    nickname: data.profile.nickname,
    gender: data.profile.gender,
    avatarUrl: data.profile.avatarUrl,
    backgroundUrl: data.profile.backgroundUrl,
    province: data.profile.province,
    city: data.profile.city,
    birthday: data.profile.birthday,
    signature: data.profile.signature
  }
  return userObj
}

export default { saveUser }
