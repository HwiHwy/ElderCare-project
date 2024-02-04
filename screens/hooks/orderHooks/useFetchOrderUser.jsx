import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const fetchOrderByUserid = async (id) => {
  const res = await axios.get(
    `https://silent257-001-site1.etempurl.com/api/Orders/GetByCustomerId/${id}`
  )
  return res.data
}

const useFetchOrderUser = (userId) => {
  const orderFetch = useQuery({
    queryKey: ['ordersUser'],
    queryFn: () => fetchOrderByUserid(userId),
  })
  const { data: orders, isLoading } = orderFetch
  return {
    orders,
    isLoading,
  }
}

export default useFetchOrderUser
