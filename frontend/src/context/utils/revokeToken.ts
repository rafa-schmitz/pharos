import { axiosPrivate } from '../../services/axios'

export const revokeToken = async () =>  await axiosPrivate.delete("/revoke")
