import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  async function handleSignUp(data: SignUpForm) {
    try {
      await new Promise((r) => setTimeout(r, 2000))

      console.log(data)

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante')
    }
  }

  return (
    <div>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button asChild variant="ghost" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Criar conta grátis</h1>
            <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento*</Label>
              <Input id="restaurantName" autoFocus {...register('restaurantName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome*</Label>
              <Input id="managerName" {...register('managerName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail*</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu telefone*</Label>
              <Input id="phone" type="tel" {...register('phone')} />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-xs leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="underline underline-offset-2">
                Termos de Serviço
              </a>{' '}
              e{' '}
              <a href="#" className="underline underline-offset-2">
                Políticas de Privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
