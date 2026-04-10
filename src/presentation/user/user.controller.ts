import type { Request, Response } from "express"
import { RegisterUserService} from "./services/register-user.service.js"
import type { FinderUsersService } from "./services/finder-users.service.js"
import type { FinderUserService } from "./services/finder-user.service.js"
import type { UpdateUserService } from "./services/update-user.service.js"
import type { DeleteUserService } from "./services/delete-user.service.js"
import { CustomError, UserLoginDto, UserRegisterDto, UserUpdateDto } from "../../domain/index.js"
import type { LoginUserService } from "./services/login-user.service.js"
import { envs } from "../../config/envs.js"


export class UserController {
  constructor(
    private readonly registerUser: RegisterUserService,
    private readonly finderUsers: FinderUsersService, 
    private readonly finderUser: FinderUserService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService,
    private readonly loginUser: LoginUserService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message: error.message
      })
    }

    console.log(error);
    return res.status(500).json({
      message: "Something went worng"
    })
  }

  register = (req: Request, res: Response) => {

    const [error, userRegisterDto] = UserRegisterDto.excecute(req.body)

    if(error) return res.status(422).json({
      message: error
    })

    this.registerUser
    .execute(userRegisterDto!)
    .then((message) => {
      return res.status(201).json({
        message: message
      })
    })
    .catch((err) => this.handleError(err, res))
  }

  findAll = (req: Request, res: Response) => {
    this.finderUsers
    .execute()
    .then((users) => {
      return res.status(200).json(users)
    })
    .catch((err) => this.handleError(err, res))
  }

  findOne = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    this.finderUser
    .execute(id)
    .then((user) => res.status(200).json(user))
    .catch((err) => this.handleError(err, res))
  }

  update = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params
    const [error, userUpdateDto ] = UserUpdateDto.execute(req.body)

    if(error) {
      return res.status(422).json({
        error: error 
      })
    }

    this.updateUser
    .execute(id, userUpdateDto!)
    .then((user) => res.status(200).json(user))
    .catch((err) => this.handleError(err, res))
  }

  delete = (req: Request<{ id: string }>, res: Response) => {

    const { id } = req.params

    this.deleteUser
    .execute(id)
    .then((user) => res.status(204).json(null))
    .catch((err) => this.handleError(err, res))
  }

  login = (req: Request<{},{},{email: string, password: string}>, res: Response) => {
    const [error, userLoginDto] = UserLoginDto.execute(req.body)

    if(error) {
      return res.status(422).json({
        error
      })
    }

    this.loginUser
    .execute(userLoginDto!)
    .then((data) => {
        res.cookie('token', data.token, {
        httpOnly: true,
        secure: envs.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3*60*60*1000
      })
      return res.status(200).json({ data: data.user })
    })
    .catch((err) => this.handleError(err, res))
  }

  validateAccount = () => {
    
  }

} 