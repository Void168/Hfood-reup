import React, { useState } from 'react'
import {Avatar} from '@material-ui/core'
import {Container, Row} from 'react-bootstrap'

export default function ProfileImage() {
    const [avatar, setAvatar] = useState(null)
    const [error, setError] =useState(false)

    const handleChangeAvatar = (e) =>{
        const selected = e.target.file[0];
        const ALLOW_TYPES = ["image/png", "image/jpeg", "image/jpg"];
        if(selected && ALLOW_TYPES.includes(selected.type)){
            let reader = new FileReader();
            reader.onloadend = () =>{
                setAvatar(reader.result)
            }
            reader.readAsDataURL(selected)
        }else{
            setError(true)
        }
    }
    return (
        <div className="Avatar">
            <Container>
                {
                    error && <p className="errorMsg">
                        Không hỗ trợ định dạng file ảnh này
                    </p>
                }
                <p>Thay đổi ảnh đại diện</p>
                <Avatar style={{backgroundImage: avatar 
                    ? `url("${avatar}") no-repeat center/cover` 
                    : `url("../style/avatar-default.jpg") no-repeat center/cover`}} 
                    className="avatar-change">
                    {
                    !avatar && (
                        <input type="file" id="fileUpload" onChange={handleChangeAvatar} />
                    )
                }
                </Avatar>
                <Row>
                    <label htmlFor="fileUpload" 
                        className="customFileUpload" style={{cursor:'pointer'}}>
                            Chọn ảnh <span><i class="fas fa-camera"></i></span><br/>
                    </label>
                    
                </Row>
                
            </Container>
        </div>
    )
}
