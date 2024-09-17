'use client'

import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js'
import { VictoryPie, VictoryLabel } from 'victory'
import { Bell, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR/index.js'
import { DateRange } from 'react-day-picker'
import { motion } from 'framer-motion'
import { usePopper } from 'react-popper'

ChartJS.register(ArcElement, ChartTooltip, Legend)

// Utility functions
const generateVisitorData = (start: Date, end: Date, view: string) => {
  const data = []
  const currentDate = new Date(start)
  while (currentDate <= end) {
    data.push({
      date: currentDate.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 1000) + 100,
    })
    if (view === 'day') {
      currentDate.setDate(currentDate.getDate() + 1)
    } else if (view === 'week') {
      currentDate.setDate(currentDate.getDate() + 7)
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1)
    }
  }
  return data
}

const generateNewsletterData = () => ({
  labels: ['Inscritos', 'Cancelados', 'Abertos', 'Clicados'],
  datasets: [{
    data: [
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 500),
      Math.floor(Math.random() * 2000),
      Math.floor(Math.random() * 1500),
    ],
    backgroundColor: ['#60A5FA', '#93C5FD', '#BFDBFE', '#2563EB'],
    hoverBackgroundColor: ['#2563EB', '#60A5FA', '#93C5FD', '#1D4ED8'],
  }],
})

const generateTrafficData = () => [
  { x: "Orgânico", y: Math.floor(Math.random() * 100) },
  { x: "Social", y: Math.floor(Math.random() * 100) },
  { x: "Direto", y: Math.floor(Math.random() * 100) },
  { x: "Referência", y: Math.floor(Math.random() * 100) },
]

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [dateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  })
  const [selectedView, setSelectedView] = useState('day')
  const [visitorData, setVisitorData] = useState([])
  const [newsletterData, setNewsletterData] = useState(generateNewsletterData())
  const [trafficData, setTrafficData] = useState(generateTrafficData())
  const [notifications] = useState([
    { id: 1, message: "Novo marco de visitantes alcançado!" },
    { id: 2, message: "Taxa de inscrição na newsletter aumentou 5%" },
    { id: 3, message: "Tráfego das redes sociais aumentou na última hora" },
  ])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const [datePickerRef, setDatePickerRef] = useState(null)
  const [datePickerPopperRef, setDatePickerPopperRef] = useState(null)
  const { styles: datePickerStyles, attributes: datePickerAttributes } = usePopper(datePickerRef, datePickerPopperRef, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
        },
      },
    ],
  })

  const [notificationsRef, setNotificationsRef] = useState(null)
  const [notificationsPopperRef, setNotificationsPopperRef] = useState(null)
  const { styles: notificationsStyles, attributes: notificationsAttributes } = usePopper(notificationsRef, notificationsPopperRef, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'clippingParents',
        },
      },
    ],
  })

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setVisitorData(generateVisitorData(dateRange.from, dateRange.to, selectedView))
      setNewsletterData(generateNewsletterData())
      setTrafficData(generateTrafficData())
    }
  }, [dateRange, selectedView])

  const handleAuthentication = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'password123') {
      setIsAuthenticated(true)
    } else {
      alert('Senha incorreta')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#2563EB] bg-opacity-50 backdrop-blur-md flex items-center justify-center">
        <motion.form
          onSubmit={handleAuthentication}
          className="bg-[#F3F4F6] bg-opacity-20 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#374151]">Autenticação</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full p-2 mb-4 rounded bg-white bg-opacity-20 text-[#374151] placeholder-gray-400 placeholder-opacity-70"
          />
          <button type="submit" className="w-full bg-[#2563EB] text-white p-2 rounded hover:bg-[#1D4ED8] transition-colors">
            Entrar
          </button>
        </motion.form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#60A5FA] via-[#93C5FD] to-[#2563EB] p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold text-white mb-4 sm:mb-0">Painel de Controle do Portfólio</h1>
          <div className="flex flex-wrap items-center justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <motion.button
              ref={setDatePickerRef}
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white flex items-center hover:bg-opacity-30 transition"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                <>
                  {format(dateRange.from, "dd 'de' MMMM", { locale: ptBR })} 
                  {dateRange.to && ` - ${format(dateRange.to, "dd 'de' MMMM", { locale: ptBR })}`}
                </>
              ) : (
                "Selecionar período"
              )}
            </motion.button>
            {showDatePicker && (
              <motion.div
                ref={setDatePickerPopperRef}
                style={datePickerStyles.popper}
                {...datePickerAttributes.popper}
                className="p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-md shadow-lg z-10 text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button onClick={() => setShowDatePicker(false)}>Fechar</button>
              </motion.div>
            )}
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition"
            >
              <option value="day">Diário</option>
              <option value="week">Semanal</option>
              <option value="month">Mensal</option>
            </select>
            <motion.button
              ref={setNotificationsRef}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Bell className="h-6 w-6" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
            {showNotifications && (
              <motion.div
                ref={setNotificationsPopperRef}
                style={notificationsStyles.popper}
                {...notificationsAttributes.popper}
                className="p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-md shadow-lg z-10 text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-lg mb-2">Notificações</h3>
                {notifications.map((notification) => (
                  <div key={notification.id} className="mb-2">
                    {notification.message}
                  </div>
                ))}
                <button onClick={() => setShowNotifications(false)}>Fechar</button>
              </motion.div>
            )}
          </div>
        </header>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Dados de Visitantes</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff33" />
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                  labelStyle={{ color: '#ffffff' }}
                />
                <Line type="monotone" dataKey="visitors" stroke="#8884d8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Interações com Newsletter</h2>
            <div className="h-64">
              <Doughnut
                data={newsletterData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        color: '#ffffff',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4">Fontes de Tráfego</h2>
            <div className="h-80">
              <VictoryPie
                data={trafficData}
                colorScale={["#60A5FA", "#93C5FD", "#BFDBFE", "#2563EB"]}
                animate={{ duration: 2000 }}
                labelComponent={<VictoryLabel style={{ fill: "white" }} />}
                style={{
                  data: {
                    fillOpacity: 0.9,
                    stroke: "#ffffff",
                    strokeWidth: 2
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}