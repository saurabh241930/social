import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesOf } from '../redux/messageSlice'


export default function Conversation() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessagesOf(id));
    }, [dispatch, id]);
    return (
        <div>CHAT</div>
    )
}